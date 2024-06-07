import { Router } from 'express';
import { authSignUpController, verifyAccountController } from './authControllers.js';
const authRoutes = Router();

authRoutes.post('/registro', authSignUpController)
authRoutes.post('/confirmar-cuenta', verifyAccountController)

export default authRoutes

