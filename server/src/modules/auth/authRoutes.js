import { Router } from 'express';
import { authSignUpCtrl, sendConfirmAccountCtrl, sendRecoverPasswordCtrl, confirmAccountCtrl, recoverPasswordCtrl, authLogInCtrl } from './authControllers.js';
import { authLoginSchema, authRegisterSchema } from './authSchema.js';
import { validateSchema } from '../../middlewares/expressValidator.js';
const authRoutes = Router();

authRoutes.post('/auth/signup', authRegisterSchema, validateSchema, authSignUpCtrl)
authRoutes.post('/auth/login', authLoginSchema, validateSchema, authLogInCtrl)
authRoutes.post('/auth/send-account-confirm', sendConfirmAccountCtrl)
authRoutes.post('/auth/confirm-account', confirmAccountCtrl)
authRoutes.post('/auth/send-recover-code', sendRecoverPasswordCtrl)
authRoutes.post('/auth/recover-password', recoverPasswordCtrl)
export default authRoutes

