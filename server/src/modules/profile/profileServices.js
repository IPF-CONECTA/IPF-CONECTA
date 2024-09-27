import { Follower } from "../followers/followerModel.js"
import { Role } from "../roles/roleModel.js"
import { User } from "../users/userModel.js"
import { Profile } from "./profileModel.js"

export const getProfileByUsername = async (id, username) => {
    try {
        const profile = await Profile.findOne({
            attributes: ['id', 'names', 'surnames', 'profilePic', 'title', 'about'],
            include: {
                model: User,
                where: {
                    username
                },
                attributes: ['id', 'username'],
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

        if (id !== profile.id) {
            res.own = false;
            res.isFollowing = false;
            const following = await Follower.findOne({
                where: {
                    followingId: profile.id,
                    followerId: id
                }
            })
            if (following) {
                res.isFollowing = true
            }
        }
        return res
    } catch (error) {
        throw error
    }
}

export const getProfileById = async (id) => {
    try {
        const profile = await Profile.findByPk(id)
        if (!profile) throw new error("No se encontro el perfil")
        return profile
    } catch (error) {
        throw error
    }
}