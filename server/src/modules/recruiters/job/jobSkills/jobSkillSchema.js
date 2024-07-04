import { body } from "express-validator";

export const jobSkillSchema = [
    body('jobId')
        .isEmpty()
        .withMessage('El trabajo es requerido'),
    body('skillId')
        .isEmpty()
        .withMessage('La habilidad es requerida'),
]