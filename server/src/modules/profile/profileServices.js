import { Follower } from "../followers/followerModel.js"
import { Role } from "../roles/roleModel.js"
import { User } from "../users/userModel.js"
import { Profile } from "./profileModel.js"

export const getProfileById = async (id, profileId) => {
    try {
        const profile = await Profile.findByPk(profileId, {
            attributes: ['id', 'names', 'surnames', 'profilePic', 'title', 'about'],
            include: {
                model: User,
                attributes: ['id'],
                include: {
                    model: Role,
                    attributes: ['name']
                }
            }
        })
        const cantFollowers = await Follower.count({
            where: {
                followingId: profile.id
            }
        })
        const cantFollowing = await Follower.count({
            where: {
                followerId: profile.id
            }
        })
        const res = { profile, cantFollowers, cantFollowing, own: true }

        if (id !== profileId) {
            res.own = false;
            res.following = false;
            const following = await Follower.findOne({
                where: {
                    followingId: profile.id,
                    followerId: id
                }
            })
            if (following) {
                res.following = true
            }
        }
        return res
    } catch (error) {
        throw error
    }
}