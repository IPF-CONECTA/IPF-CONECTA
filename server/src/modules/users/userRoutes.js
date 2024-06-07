import { Router } from 'express';
import { createUserController, getUsersController } from './userControllers.js';

const userRoutes = Router();

userRoutes.get('/getUsers', getUsersController)

userRoutes.post('/createUser', createUserController)

export default userRoutes