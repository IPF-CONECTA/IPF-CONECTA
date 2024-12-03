
import { createUser, getProfileIdByUsername, getProfileInfoSvc,searchUsers , getRecommendedProfilesSvc, getUsers, isEmailAvailable, isUsernameAvailable } from './userServices.js';

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

export const searchUsersCtrl = async (req, res) => {
    const { query } = req.query; // Obtener el término de búsqueda desde el query parameter
    try {
      // Buscar usuarios en la base de datos según el término de búsqueda
      const users = await searchUsers(query); // Asumiendo que tienes un servicio `searchUsers`
      
      // Eliminar duplicados basados en el username
      const uniqueUsers = Array.from(new Set(users.map(a => a.username)))
        .map(username => {
          return users.find(a => a.username === username);
        });
  
      if (uniqueUsers.length === 0) {
        return res.status(404).json({ message: 'No se encontraron usuarios.' });
      }
  
      res.status(200).json(uniqueUsers); // Devolver los usuarios únicos
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en la búsqueda de usuarios.' });
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
    const { username } = req.params;
    try {
        const profileId = await getProfileIdByUsername(username)
        if (id == profileId) return res.status(400).json()
        const { profile, following, cantFollowers, cantFollowing } = await getProfileInfoSvc(id, profileId)
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

export const createUserCtrl = async (req, res) => {
    const { user } = req.body
    try {
        const newUser = await createUser(user)
        if (!newUser) return res.status(400).json({ message: 'No se pudo crear el usuario' })
        res.status(201).json({ message: 'Usuario generado con éxito' })
    } catch (error) {
        if (error.message == 'Rol no valido') {
            res.status(400).json({ message: error.message })
        }
        res.status(500).json({ message: error.message })
    }
}

export const getRecommendedProfilesCtrl = async (req, res) => {
    const { id } = req.user.profile
    try {
        const profiles = await getRecommendedProfilesSvc(id);
        if (profiles.length == 0) {
            return res.status(404).json({ message: 'No se encontraron usuarios' })
        }
        res.status(200).json(profiles);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
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