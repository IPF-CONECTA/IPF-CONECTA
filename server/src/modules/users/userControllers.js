
import { createUser, getUsers } from './userServices.js';

export const getUsersController = async (_req, res) => {
    try {
        const users = await getUsers();

        if (users.length == 0) {
            res.status(400).json({ message: 'No se encontraron usuarios' })
        }
        res.status(200).json(users);
    } catch (error) {

        res.status(500).json({ message: error.message });

    }
};

export const createUserController = async (req, res) => {
    const { user } = req.body
    try {
        const newUser = await createUser(user)
        res.status(201).json({ newUser, message: 'Usuario generado con exito' })
    } catch (error) {
        if (error.message == 'Rol no valido') {
            res.status(400).json({ message: error.message })
        }
        res.status(500).json({ message: error.message })
    }
}