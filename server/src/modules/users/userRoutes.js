import { Router } from 'express';
import { createUserController, getUsersController } from './userControllers.js';
import { validateSchema } from '../../middlewares/expressValidator.js';
import { userSchema } from './userSchema.js';

const userRoutes = Router();

userRoutes.get('/get-users', getUsersController)

userRoutes.post('/create-user', userSchema, validateSchema, createUserController)

export default userRoutes