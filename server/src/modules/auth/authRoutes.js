import { Router } from 'express';
import { authSignUpCtrl, sendConfirmAccountCtrl, sendRecoverPasswordCtrl, confirmAccountCtrl } from './authControllers.js';
const authRoutes = Router();

authRoutes.post('/registro', authSignUpCtrl)
authRoutes.post('/confirmar-cuenta', confirmAccountCtrl)
authRoutes.post('/recibir-correo-code', sendConfirmAccountCtrl)
authRoutes.post('/send-recover-code', sendRecoverPasswordCtrl)
export default authRoutes

