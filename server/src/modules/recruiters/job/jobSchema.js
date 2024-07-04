import { body } from 'express-validator';
import { Job } from './jobModel.js';
import { Company } from '../companies/companyModel.js';
import jwt from 'jsonwebtoken';
export const jobSchema = [
    body('jobOffer.title')
        .isString()
        .notEmpty()
        .isLength({ min: 5, max: 100 })
        .withMessage('El titulo debe tener entre 5 y 100 caracteres')
        .custom(async (value, { req }) => {
            const { companyId } = req.body.jobOffer;
            const { token } = req.headers
            const { userId } = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
            const company = await Company.findByPk(companyId);
            console.log(company)
            const existingJob = await Job.findOne({ where: { title: value, companyId: companyId, userId: userId } });
            if (existingJob) {
                return Promise.reject(`Tienes una publicacion igual de ${value} para la empresa de ${company.companyName}`);
            }
        }
        ),
    body('jobOffer.description')
        .isString()
        .notEmpty()
        .isLength({ min: 10 })
        .withMessage('La descripcion debe tener al menos 10 caracteres'),
    body('jobOffer.companyId')
        .notEmpty()
        .isUUID()
        .withMessage('La empresa es requerida'),
    body('jobOffer.contractTypeId')
        .notEmpty().withMessage('El tipo de contrato es requerido')
]