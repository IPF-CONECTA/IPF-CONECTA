import { Router } from 'express';
import { createUserController, getUsersController } from './userControllers.js';
import { validateSchema } from '../../middlewares/expressValidator.js';
import { userSchema } from './userSchema.js';

const userRoutes = Router();

userRoutes.get('/getUsers', getUsersController)

userRoutes.post('/createUser', userSchema, validateSchema, createUserController)

export default userRoutes