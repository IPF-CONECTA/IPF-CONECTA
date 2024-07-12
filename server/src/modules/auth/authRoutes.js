import { Router } from 'express';
import { authSignUpCtrl, sendConfirmAccountCtrl, sendRecoverPasswordCtrl, confirmAccountCtrl, recoverPasswordCtrl, authLogInCtrl, verifyToken } from './authControllers.js';
import { authLoginSchema, authRegisterSchema } from './authSchema.js';
import { validateSchema } from '../../middlewares/expressValidator.js';
import { isToken } from '../../middlewares/jwt/isVerifiedAccount.js';
const authRoutes = Router();

authRoutes.post('/auth/signup', authRegisterSchema, validateSchema, authSignUpCtrl)
authRoutes.post('/auth/login', authLoginSchema, validateSchema, authLogInCtrl)
authRoutes.post('/auth/send-account-confirm', sendConfirmAccountCtrl)
authRoutes.post('/auth/confirm-account', confirmAccountCtrl)
authRoutes.post('/auth/send-recover-code', sendRecoverPasswordCtrl)
authRoutes.post('/auth/recover-password', recoverPasswordCtrl)
authRoutes.get('/auth/verify-token', isToken, verifyToken)
export default authRoutes

