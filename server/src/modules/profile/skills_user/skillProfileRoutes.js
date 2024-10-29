import { Router } from 'express';
import { getProfileSkills, toggleSkill } from './skillProfileControllers.js';
import { isToken } from '../../../middlewares/jwt/isVerifiedAccount.js';

const SkillProfileRoutes = Router();

SkillProfileRoutes.post('/skillProfile/:skillId', isToken, toggleSkill);
SkillProfileRoutes.get('/skillsProfile/:username', isToken, getProfileSkills);

export default SkillProfileRoutes;