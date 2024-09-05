import { Role } from "../roles/roleModel.js"
import { User } from "../users/userModel.js"
import { Profile } from "./profileModel.js"

export const getProfileById = async (id, followingId) => {
    try {
        const profile = await Profile.findByPk(followingId, {
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
        return { profile, own: id == followingId ? true : false }
    } catch (error) {
        throw error
    }
}