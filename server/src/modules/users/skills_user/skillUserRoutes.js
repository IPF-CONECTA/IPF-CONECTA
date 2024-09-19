import { Router } from 'express';
import { linkSkillToUser, getUserSkills } from './skillUserController.js';
import { isToken } from '../../../middlewares/jwt/isVerifiedAccount.js';
const SkillUserRouter = Router();

// Aplicar el middleware de autenticación a todas las rutas
SkillUserRouter.use(isToken); // Usa isToken para verificar el JWT

// Rutas
SkillUserRouter.post('/link-skill', linkSkillToUser);  // Vincular una habilidad
SkillUserRouter.get('/user-skills', getUserSkills);    // Obtener habilidades del usuario

export default SkillUserRouter;
