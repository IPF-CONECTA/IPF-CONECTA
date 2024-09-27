import { User } from "./userModel.js";
import { ALL_ROLES } from "../../constant/roles.js";
import { BASIC_ROLES } from "../../constant/roles.js";
import bcrypt from "bcryptjs";
import { Follower } from "../followers/followerModel.js";
import { Op } from "sequelize";
import { Profile } from "../profile/profileModel.js";
import { sequelize } from "../../config/db.js";
import { Role } from "../roles/roleModel.js";
import { Association } from "../recruiters/associations/associationModel.js";
import { Company } from "../recruiters/companies/companyModel.js";
import { CompanyIndustry } from "../recruiters/companies/companyIndustry/companyIndustryModel.js";
import { LangsUser } from "./langs_user/langsUserModel.js";
import { Lang } from "../langs/langModel.js";
import { LangLevel } from "../langs/langLevelsModel.js";
import { Post } from "../posts/postModel.js";

export const getUsers = async () => {
  const users = await User.findAll();
  return users;
};

export const getRecomendedUsersSvc = async (profileId) => {
  try {
    const following = await Follower.findAll({
      where: {
        followerId: profileId,
      },
      attributes: ["followingId"],
    });
    const followedProfilesIds = following.map((follower) => follower.followingId);
    const users = await User.findAll({
      where: {
        [Op.or]: [
          { roleId: BASIC_ROLES.recruiter },
          { roleId: BASIC_ROLES.student },
        ],
        id: {
          [Op.ne]: profileId,
        },
      },
      attributes: ["id", "email", "username"],
      limit: 5,
      include: {
        model: Profile,
        attributes: ["id", "names", "surnames", "profilePic", "title"],
        where: {
          id: {
            [Op.notIn]: [...followedProfilesIds, profileId],
          },
        },
      },
    });

    return users;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const user = await User.findByPk(userId, {
      attributes: ["id", "email", "username"],
      include: [
        {
          model: Profile,
          attributes: ["id", "names", "surnames", "profilePic", "title"],
        },
        {
          model: Role,
          attributes: ["name"],
        },
      ],
    });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getProfileInfoSvc = async (id, followingId) => {
  try {
    const profile = await Profile.findByPk(followingId, {
      attributes: ["id", "profilePic", "names", "surnames", "title"],
      include: {
        model: User,
        attributes: ["email", "username"],
      },
    });

    const following = await Follower.findOne({
      where: {
        followingId: profile.id,
        followerId: id,
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
    return { profile, following, cantFollowers, cantFollowing };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createUser = async (user) => {
  const t = await sequelize.transaction();
  try {
    const roleId = ALL_ROLES[user.role];
    const hashpass = await bcrypt.hash(user.password, 10);

    user = {
      names: user.names,
      surnames: user.surnames,
      username: user.username,
      roleId: roleId,
      password: hashpass,
      email: user.email,
      userStateId: 1,
    };

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username: user.username }, { email: user.email }],
      },
    });

    if (existingUser) {
      throw new Error("El usuario ya existe en nuestro sistema.");
    }
    const createdUser = await User.create(
      {
        email: user.email,
        username: user.username,
        roleId: roleId,
        password: hashpass,
      },
      { transaction: t }
    );
    const profile = await Profile.create(
      {
        userId: createdUser.id,
        names: user.names,
        surnames: user.surnames,
        userStateId: 1,
        state: 1,
      },
      { transaction: t }
    );

    await t.commit();
    return createdUser;
  } catch (error) {
    console.log(error);
  }
};
