
import { createUser, getProfileInfoSvc, getRecomendedUsersSvc, getUsers } from './userServices.js';

export const getUsersController = async (_req, res) => {
    try {
        const users = await getUsers();

        if (users.length == 0) {
            return res.status(400).json({ message: 'No se encontraron usuarios' })
        }
        res.status(200).json(users);
    } catch (error) {

        res.status(500).json({ message: error.message });

    }
};

export const getUserByIdCtrl = async (req, res) => {
    try {
        const { id } = req.user.profile;
        const { profileId } = req.params;
        if (!id || !profileId) return res.status(400).json();
        if (id == profileId) return res.status(400)
        const profile = await getProfileInfoSvc(id, profileId);
        if (!profile) return res.status(404).json();

        res.status(200).json(profile)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

export const getUserInfoCtrl = async (req, res) => {
    const { id } = req.user.profile;
    const { profileId } = req.params;
    try {
        if (id == profileId) return res.status(400).json()
        const { profile, following, cantFollowers, cantFollowing } = await getProfileInfoSvc(id, profileId)
        console.log(profile)
        if (!profile) {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }
        if (!following) {
            return res.status(200).json({ profile, isFollowing: false, cantFollowers, cantFollowing })
        }
        res.status(200).json({ profile, isFollowing: true, cantFollowers, cantFollowing })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

export const createUserController = async (req, res) => {
    const { user } = req.body
    try {
        const newUser = await createUser(user)
        if (!newUser) return res.status(400).json({ message: 'No se pudo crear el usuario' })
        res.status(201).json({ message: 'Usuario generado con exito' })
    } catch (error) {
        if (error.message == 'Rol no valido') {
            res.status(400).json({ message: error.message })
        }
        res.status(500).json({ message: error.message })
    }
}

export const getRecomendedUsersController = async (req, res) => {
    const { id } = req.user.profile
    try {
        const users = await getRecomendedUsersSvc(id);
        if (users.length == 0) {
            return res.status(404).json({ message: 'No se encontraron usuarios' })
        }
        res.status(200).json(users);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}