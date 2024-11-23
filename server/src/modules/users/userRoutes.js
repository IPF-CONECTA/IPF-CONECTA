import { Router } from 'express';
<<<<<<< HEAD
import { createUserCtrl, getUserInfoCtrl, getUsersController, getRecommendedProfilesCtrl } from './userControllers.js';
=======
import {
    createUserController,
    getUserByIdCtrl,
    getRecomendedUsersController,
    getUserInfoCtrl,
    getUsersController,
    getUserInfoCtrl1
} from './userControllers.js';
>>>>>>> 166135bf0ccd58015a96076590f7549fad98facc
import { validateSchema } from '../../middlewares/expressValidator.js';
import { userSchema } from './userSchema.js';
import { isToken } from '../../middlewares/jwt/isVerifiedAccount.js';

const userRoutes = Router();

userRoutes.get('/get-users', getUsersController);
userRoutes.post('/create-user', userSchema, validateSchema, createUserController);
userRoutes.get('/get-recomended-users', isToken, getRecomendedUsersController);
userRoutes.get('/get-user-info/:profileId', isToken, getUserInfoCtrl);
userRoutes.get('/get-user/:userId', isToken, getUserInfoCtrl1);

<<<<<<< HEAD
userRoutes.post('/create-user', userSchema, validateSchema, createUserCtrl)

userRoutes.get('/get-recommended-profiles', isToken, getRecommendedProfilesCtrl)

userRoutes.get('/get-user-info/:username', isToken, getUserInfoCtrl)

export default userRoutes
=======
export default userRoutes;
>>>>>>> 166135bf0ccd58015a96076590f7549fad98facc
