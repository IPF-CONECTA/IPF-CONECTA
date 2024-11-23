<<<<<<< HEAD

import { createUser, getProfileIdByUsername, getProfileInfoSvc, getRecommendedProfilesSvc, getUsers, isEmailAvailable, isUsernameAvailable } from './userServices.js';
=======
import {
    createUser,
    getUserInfoSvc,
    getRecomendedUsersSvc,
    getUsers,
    getUserById
} from './userServices.js';
>>>>>>> 166135bf0ccd58015a96076590f7549fad98facc

export const getUsersController = async (_req, res) => {
    try {
        const users = await getUsers();

        if (users.length === 0) {
            return res.status(404).json({ message: 'No se encontraron usuarios' });
        }
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno en el servidor' });
    }
};

export const getUserByIdCtrl = async (req, res) => {
    try {
        const { id } = req.user.profile;
        const { profileId } = req.params;
<<<<<<< HEAD
        if (!id || !profileId) return res.status(400).json();
        if (id == profileId) return res.status(400)
        const profile = await getProfileInfoSvc(id, profileId);
        if (!profile) return res.status(404).json();
=======
>>>>>>> 166135bf0ccd58015a96076590f7549fad98facc

        if (!id || !profileId) return res.status(400).json({ message: 'ID de usuario no válido' });
        if (id === profileId) return res.status(400).json({ message: 'No se puede obtener información del propio usuario' });

        const profile = await getUserInfoSvc(id, profileId);
        if (!profile) return res.status(404).json({ message: 'Usuario no encontrado' });

        res.status(200).json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno en el servidor' });
    }
};

export const getUserInfoCtrl = async (req, res) => {
    const { id } = req.user.profile;
<<<<<<< HEAD
    const { username } = req.params;
=======
    const { profileId } = req.params;

>>>>>>> 166135bf0ccd58015a96076590f7549fad98facc
    try {
        const profileId = await getProfileIdByUsername(username)
        if (id == profileId) return res.status(400).json()
        const { profile, following, cantFollowers, cantFollowing } = await getProfileInfoSvc(id, profileId)
        if (!profile) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json({ profile, isFollowing: following, cantFollowers, cantFollowing });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno en el servidor' });
    }
};

export const getUserInfoCtrl1 = async (req, res) => {
    const userId = req.user.id; 

    try {
        const user = await getUserById(userId);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        res.status(200).json(user);
    } catch (error) {
        console.error("Error interno en el servidor:", error);
        res.status(500).json({ message: "Error interno en el servidor" });
    }
};

<<<<<<< HEAD
export const createUserCtrl = async (req, res) => {
    const { user } = req.body
=======
export const createUserController = async (req, res) => {
    const { user } = req.body;

>>>>>>> 166135bf0ccd58015a96076590f7549fad98facc
    try {
        const newUser = await createUser(user)
        if (!newUser) return res.status(400).json({ message: 'No se pudo crear el usuario' })
        res.status(201).json({ message: 'Usuario generado con éxito' })
    } catch (error) {
        if (error.message === 'Rol no válido') {
            return res.status(400).json({ message: error.message });
        }
        console.error(error);
        res.status(500).json({ message: 'Error interno en el servidor' });
    }
};

<<<<<<< HEAD
export const getRecommendedProfilesCtrl = async (req, res) => {
    const { id } = req.user.profile
    try {
        const profiles = await getRecommendedProfilesSvc(id);
        if (profiles.length == 0) {
            return res.status(404).json({ message: 'No se encontraron usuarios' })
=======
export const getRecomendedUsersController = async (req, res) => {
    const { id } = req.user.profile;

    try {
        const users = await getRecomendedUsersSvc(id);
        if (users.length === 0) {
            return res.status(404).json({ message: 'No se encontraron usuarios recomendados' });
>>>>>>> 166135bf0ccd58015a96076590f7549fad98facc
        }
        res.status(200).json(profiles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno en el servidor' });
    }
<<<<<<< HEAD
}

export const isEmailAvailableCtrl = async (req, res) => {
    const { email } = req.body;
    const { id } = req.user;
    try {
        const isAvailable = await isEmailAvailable(email, id)
        if (!isAvailable) return res.status(400).json({ message: 'El email ya esta en uso' })
        res.status(200).json()
    } catch (error) {
        res.status(500).json({ message: "Error interno en el servidor" })
    }
}

export const isUsernameAvailableCtrl = async (req, res) => {
    const { username } = req.body;
    const { id } = req.user;
    try {
        const isAvailable = await isUsernameAvailable(username, id)
        if (!isAvailable) return res.status(400).json({ message: 'El nombre de usuario ya esta en uso' })
        res.status(200).json()
    } catch (error) {
        res.status(500).json({ message: "Error interno en el servidor" })
    }
}
=======
};
>>>>>>> 166135bf0ccd58015a96076590f7549fad98facc
