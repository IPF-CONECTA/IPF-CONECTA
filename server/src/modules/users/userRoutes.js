import { Router } from 'express';
import { createUserController, getRecomendedUsersController, getUserInfoCtrl, getUsersController } from './userControllers.js';
import { validateSchema } from '../../middlewares/expressValidator.js';
import { userSchema } from './userSchema.js';
import { isToken } from '../../middlewares/jwt/isVerifiedAccount.js';

const userRoutes = Router();

userRoutes.get('/get-users', getUsersController)

userRoutes.post('/create-user', userSchema, validateSchema, createUserController)

userRoutes.get('/get-recomended-users', isToken, getRecomendedUsersController)

userRoutes.get('/get-user-info/:followingId', isToken, getUserInfoCtrl)

export default userRoutes