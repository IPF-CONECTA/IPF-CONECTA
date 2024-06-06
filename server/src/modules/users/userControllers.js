
import { createUser, getUsers } from './userServices.js';

export const getUsersController = async (_req, res) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        if (error.message === 'No se encontraron usuarios') {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

export const createUserController = async ()=>{
    try {
        const newUser = await createUser()
        res.status(200).json(newUser)
    } catch (error) {
        res.status(500)
    }
}