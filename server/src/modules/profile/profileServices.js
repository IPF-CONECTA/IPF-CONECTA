import { Follower } from "../followers/followerModel.js";
import { Role } from "../roles/roleModel.js";
import { User } from "../users/userModel.js";
import { Profile } from "./profileModel.js";

export const getProfileById = async (id, profileId) => {
    try {
        const profile = await Profile.findByPk(profileId, {
            attributes: ['id', 'names', 'surnames', 'profilePic', 'title', 'about'],
            include: {
                model: User,
                attributes: ['id', 'username'],
                include: {
                    model: Role,
                    attributes: ['name']
                }
            }
        });

        if (!profile) {
            throw new Error("Perfil no encontrado");
        }

        const cantFollowers = await Follower.count({
            where: { followingId: profile.id }
        });

        const cantFollowing = await Follower.count({
            where: { followerId: profile.id }
        });

        const response = { profile, cantFollowers, cantFollowing, own: true };

        // Verificar si el perfil no es propio
        if (id !== profileId) {
            response.own = false;
            const following = await Follower.findOne({
                where: {
                    followingId: profile.id,
                    followerId: id
                }
            });
            response.isFollowing = Boolean(following); // true o false
        }

        return response;
    } catch (error) {
        console.error("Error al obtener el perfil:", error);
        throw error; // Lanza el error para manejarlo en el controlador
    }
};
