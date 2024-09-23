import { Router } from 'express';
import { getUserSkills, linkSkillToProfile } from './skillUserController.js';
import { isToken } from '../../../middlewares/jwt/isVerifiedAccount.js';

const SkillUserRouter = Router();

// Middleware para asegurar que el usuario está autenticado
SkillUserRouter.use(isToken);

// Rutas
SkillUserRouter.post('/link-skill', linkSkillToProfile); // Vincular una habilidad
SkillUserRouter.get('/user-skills', getUserSkills);      // Obtener habilidades del usuario

export default SkillUserRouter;
