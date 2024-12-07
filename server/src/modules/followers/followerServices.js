import { Profile } from "../profile/profileModel.js";
import { User } from "../users/userModel.js";
import { Follower } from "./followerModel.js";

export const followOrUnfollowSvc = async (id, idToFollow) => {
    try {
        const user = await Profile.findByPk(id);
        const userToFollow = await Profile.findByPk(idToFollow);

        if (!user || !userToFollow) throw new Error("El usuario no existe");
        const isFollowing = await Follower.findOne({ where: { followerId: id, followingId: idToFollow } })

        if (!isFollowing) {
            const follow = await Follower.create({ followerId: id, followingId: idToFollow });
            if (!follow) throw new Error("Hubo un error al seguir a este usuario");
            return { follow, message: "Ahora sigues a este usuario" };
        }

        const unfollow = await Follower.destroy({ where: { followerId: id, followingId: idToFollow } });
        if (!unfollow) throw new Error("Hubo un error al dejar de seguir a este usuario");

        return { unfollow, message: "Dejaste de seguir a este usuario" };
    } catch (error) {
        console.log(error)
        throw new Error(error.message);
    }
}

export const getConnectionsSvc = async (id, type, reqId) => {
    try {
        const followers = await Follower.findAll({
            where: { [type === "followers" ? "followingId" : "followerId"]: id },
            include: [{
                model: Profile,
                attributes: ["id", "names", "surnames", "title", "profilePic"],
                include: [{
                    model: User,
                    attributes: ["username"]
                }],
                as: type === "followers" ? "followerProfile" : "followingProfile"
            }],
        });

        followers.map(follower => {
            follower.dataValues.followingProfile ? follower.dataValues.followingProfile.dataValues.isFollowing = follower.followerId === reqId :
                follower.dataValues.followerProfile.dataValues.isFollowing = follower.followingId === reqId;

        });
        return followers;
    } catch (error) {
        console.log(error)
        throw new Error(error.message);
    }
}
