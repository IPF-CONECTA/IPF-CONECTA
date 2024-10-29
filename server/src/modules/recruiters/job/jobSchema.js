import { body } from 'express-validator';
import { Job } from './jobModel.js';
import { Company } from '../companies/companyModel.js';
import jwt from 'jsonwebtoken';
export const jobSchema = [
    // body('modalityId')
    //     .isNumeric().withMessage('La modalidad es invalida')
    //     .notEmpty().withMessage('La modalidad es necesaria')
    //     .isLength({
    //         min: 1,
    //         max: 4
    //     }).withMessage('La modalidad es invalida')
    // ,
    // body('description')
    //     .isString()
    //     .notEmpty()
    //     .isLength({ min: 10 })
    //     .withMessage('La descripción debe tener al menos 10 caracteres'),
    // body('companyId')
    //     .notEmpty()
    //     .isUUID()
    //     .withMessage('La empresa es requerida'),
    // body('contractTypeId')
    //     .notEmpty().withMessage('El tipo de contrato es requerido')
]
