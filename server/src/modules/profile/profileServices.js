import { sequelize } from "../../config/db.js";
import { Follower } from "../followers/followerModel.js";
import { Role } from "../roles/roleModel.js";
import { User } from "../users/userModel.js";
import { Profile } from "./profileModel.js";

export const getProfileByUsername = async (reqId, username) => {
  try {
    const profile = await Profile.findOne({
      attributes: ["id", "names", "surnames", "profilePic", "title", "about", "cuil", "birthdate", "phoneareacode", "phonenumber"],
      include: {
        model: User,
        where: {
          username,
        },
        attributes: ["id", "username", "email"],
        include: {
          model: Role,
          attributes: ["name"],
        },
      },
    });
    const cantFollowers = await Follower.count({
      where: {
        followingId: profile.id,
      },
    });
    const cantFollowing = await Follower.count({
      where: {
        followerId: profile.id,
      },
    });
    const res = { profile, cantFollowers, cantFollowing, own: true };

    if (reqId !== profile.id) {
      res.own = false;
      res.isFollowing = false;
      const following = await Follower.findOne({
        where: {
          followingId: profile.id,
          followerId: reqId,
        },
      });
      const followsYou = await Follower.findOne({
        where: {
          followerId: profile.id,
          followingId: reqId,
        },
      });

      res.isFollowing = following ? true : false;
      res.followsYou = followsYou ? true : false;
    }
    return res;
  } catch (error) {
    throw error;
  }
};

export const getProfileById = async (id) => {
  try {
    const profile = await Profile.findByPk(id);
    if (!profile) throw new error("No se encontro el perfil");
    return profile;
  } catch (error) {
    throw error;
  }
};

export const updatePfpSvc = async (url, id) => {
  try {
    const updatedPfp = await Profile.update(
      { profilePic: url },
      { where: { id } }
    );
    const profile = await Profile.findByPk(id);
    return profile.profilePic;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateBannerSvc = async (url, id) => {
  try {
    const updatedBanner = await Profile.update(
      { bannerPic: url },
      { where: { id } }
    );
    return updatedBanner;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateProfileSvc = async (id, data) => {
  const t = await sequelize.transaction();
  try {
    const profile = await Profile.findByPk(id, {
      include: {
        model: User, include: [{
          model: Role,
          attributes: ["name"],
        }]
      }
    })
    const updatedProfile = await Profile.update({
      names: data.names,
      surnames: data.surnames,
      cuil: !profile.user.role.name === "recruiter" ? data.cuil : null,
      birthdate: data.birthdate || null,
      phoneareacode: data.phoneareacode || null,
      phonenumber: data.phonenumber || null,
      title: data.title,
    }, { where: { id: profile.id }, transaction: t });

    await User.update({ email: data.email !== profile.user.email && data.email, username: data.username !== profile.user.username && data.username }, { where: { id: profile.userId }, transaction: t });

    await t.commit();
    return updatedProfile;
  } catch (error) {
    console.log(error)
    await t.rollback();
    throw error;
  }
};
