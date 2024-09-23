import { Router } from 'express';
import {
    createUserController,
    getUserByIdCtrl,
    getRecomendedUsersController,
    getUserInfoCtrl,
    getUsersController,
    getUserInfoCtrl1
} from './userControllers.js';
import { validateSchema } from '../../middlewares/expressValidator.js';
import { userSchema } from './userSchema.js';
import { isToken } from '../../middlewares/jwt/isVerifiedAccount.js';

const userRoutes = Router();

userRoutes.get('/get-users', getUsersController);
userRoutes.post('/create-user', userSchema, validateSchema, createUserController);
userRoutes.get('/get-recomended-users', isToken, getRecomendedUsersController);
userRoutes.get('/get-user-info/:profileId', isToken, getUserInfoCtrl);
userRoutes.get('/get-user/:userId', isToken, getUserInfoCtrl1);

export default userRoutes;
