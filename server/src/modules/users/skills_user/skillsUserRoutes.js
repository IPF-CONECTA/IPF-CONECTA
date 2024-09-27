import { Router } from 'express';
import { getUserSkills, linkSkillToUser, unlinkSkill } from './skillsUserController.js'; // Asegúrate de importar unlinkSkill
import { isToken } from '../../../middlewares/jwt/isVerifiedAccount.js';

const SkillUserRouter = Router();

// Middleware para asegurar que el usuario está autenticado
SkillUserRouter.use(isToken);

// Rutas
SkillUserRouter.post('/add-skill', linkSkillToUser);  // Vincular una habilidad
SkillUserRouter.get('/get-user-skills/:userId', getUserSkills);   // Obtener habilidades del usuario
SkillUserRouter.delete('/unlink-skill', unlinkSkill); // Desvincular una habilidad (ajuste en la ruta)

export default SkillUserRouter;
