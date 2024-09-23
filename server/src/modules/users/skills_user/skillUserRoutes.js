import { Router } from 'express';
import { getUserSkills, linkSkillToUser } from './skillUserController.js';  // Corrección aquí: no duplicar imports
import { isToken } from '../../../middlewares/jwt/isVerifiedAccount.js';

const SkillUserRouter = Router();

// Middleware para asegurar que el usuario está autenticado
SkillUserRouter.use(isToken);

// Rutas
SkillUserRouter.post('/add-skill', linkSkillToUser);  // Vincular una habilidad
SkillUserRouter.get('/user-skills', getUserSkills);   // Obtener habilidades del usuario

export default SkillUserRouter;
