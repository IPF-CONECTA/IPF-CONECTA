import {
    createUser,
    getUserInfoSvc,
    getRecomendedUsersSvc,
    getUsers,
    getUserById
} from './userServices.js';

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
    const { profileId } = req.params;

    try {
        if (id == profileId) return res.status(400).json()
        const { profile, following, cantFollowers, cantFollowing } = await getUserInfoSvc(id, profileId)
        console.log(profile)
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

export const createUserController = async (req, res) => {
    const { user } = req.body;

    try {
        const newUser = await createUser(user)
        if (!newUser) return res.status(400).json({ message: 'No se pudo crear el usuario' })
        res.status(201).json({ message: 'Usuario generado con exito' })
    } catch (error) {
        if (error.message === 'Rol no válido') {
            return res.status(400).json({ message: error.message });
        }
        console.error(error);
        res.status(500).json({ message: 'Error interno en el servidor' });
    }
};

export const getRecomendedUsersController = async (req, res) => {
    const { id } = req.user.profile;

    try {
        const users = await getRecomendedUsersSvc(id);
        if (users.length === 0) {
            return res.status(404).json({ message: 'No se encontraron usuarios recomendados' });
        }
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno en el servidor' });
    }
};
