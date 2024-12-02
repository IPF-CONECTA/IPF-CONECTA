import { Router } from 'express';
import { createUserCtrl, getUserInfoCtrl, getUsersController, getRecommendedProfilesCtrl,searchUsersCtrl  } from './userControllers.js';
import { validateSchema } from '../../middlewares/expressValidator.js';
import { userSchema } from './userSchema.js';
import { isToken } from '../../middlewares/jwt/isVerifiedAccount.js';

const userRoutes = Router();
userRoutes.get('/search-users', searchUsersCtrl);
userRoutes.get('/get-users', getUsersController)

userRoutes.post('/create-user', userSchema, validateSchema, createUserCtrl)

userRoutes.get('/get-recommended-profiles', isToken, getRecommendedProfilesCtrl)

userRoutes.get('/get-user-info/:username', isToken, getUserInfoCtrl)

export default userRoutes