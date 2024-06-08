import { Router } from 'express';
import { authSignUpController, sendEmailVerificationController, verifyAccountController } from './authControllers.js';
const authRoutes = Router();

authRoutes.post('/registro', authSignUpController)
authRoutes.post('/verificar-cuenta', verifyAccountController)
authRoutes.post('/recibir-correo-code', sendEmailVerificationController)

export default authRoutes

