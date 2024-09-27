import { Router } from 'express';
import { authSignUpCtrl, sendConfirmAccountCtrl, sendRecoverPasswordCtrl, confirmAccountCtrl, recoverPasswordCtrl, authLogInCtrl, verifyToken, authIsEmailAvailableCtrl, authIsUsernameAvailableCtrl } from './authControllers.js';
import { authLoginSchema, authRegisterSchema } from './authSchema.js';
import { validateSchema } from '../../middlewares/expressValidator.js';
import { isToken } from '../../middlewares/jwt/isVerifiedAccount.js';
const authRoutes = Router();

authRoutes.post('/auth/signup', authRegisterSchema, validateSchema, authSignUpCtrl)
authRoutes.post('/auth/is-email-available', authIsEmailAvailableCtrl)
authRoutes.post('/auth/is-username-available', authIsUsernameAvailableCtrl)
authRoutes.post('/auth/login', authLoginSchema, validateSchema, authLogInCtrl)
authRoutes.post('/auth/send-account-confirm', sendConfirmAccountCtrl)
authRoutes.post('/auth/confirm-account', isToken, confirmAccountCtrl)
authRoutes.post('/auth/send-recover-code', sendRecoverPasswordCtrl)
authRoutes.post('/auth/recover-password', recoverPasswordCtrl)
authRoutes.get('/auth/verify-token', isToken, verifyToken)
export default authRoutes

