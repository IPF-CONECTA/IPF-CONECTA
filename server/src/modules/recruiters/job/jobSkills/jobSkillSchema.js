import { body } from "express-validator";
import { Skill } from "../../../skills/skillsModel.js";
const getCantSkills = async () => {
    return await Skill.count()
}
export const jobSkillSchema = [
    body('jobId')
        .notEmpty()
        .isUUID()
        .withMessage('El trabajo es requerido'),
    body('skillId')
        .notEmpty()
        .isInt({ min: 1, max: getCantSkills() }).withMessage('La aptitud seleccionada no es valida')
        .withMessage('La habilidad es requerida'),
]