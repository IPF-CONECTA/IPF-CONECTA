import { Router } from 'express';
import { authSignUpCtrl, sendConfirmAccountCtrl, sendRecoverPasswordCtrl, confirmAccountCtrl, recoverPasswordCtrl, authLogInCtrl } from './authControllers.js';
const authRoutes = Router();

authRoutes.post('/signup', authSignUpCtrl)
authRoutes.post('/login', authLogInCtrl)
authRoutes.post('/send-account-confirm', sendConfirmAccountCtrl)
authRoutes.post('/confirm-account', confirmAccountCtrl)
authRoutes.post('/send-recover-code', sendRecoverPasswordCtrl)
authRoutes.post('/recover-password', recoverPasswordCtrl)
export default authRoutes

