import { body } from "express-validator";
import { Company } from "./companyModel.js";
import { Op } from "sequelize";

export const companySchema = [
    body('company.name')
        .notEmpty()
        .exists()
        .withMessage('Ingrese el nombre de la empresa')
        .custom(async (value, { req }) => {
            const existingCompany = await Company.findOne({
                where: {
                    name: value,
                    industryId: req.body.company.industryId,
                    [Op.or]: [
                        { status: 'Aprobada' },
                        { status: 'Pendiente' }
                    ]
                },
            });
            if (existingCompany) {
                return Promise.reject(`La empresa ${value} ya esta registrada`);
            }
        }),
    body('company.description')
        .exists()
        .notEmpty()
        .withMessage('Ingrese la descripcion de la empresa'),
    body('company.industryId')
        .exists()
        .notEmpty()
        .withMessage('Seleccione la industria de la empresa'),
    body('company.cantEmployees')
        .exists()
        .notEmpty()
        .withMessage('Ingrese la cantidad de empleados (aproximado) de la empresa'),
    body('company.countryOriginId')
        .exists()
        .notEmpty()
        .withMessage('Seleccione el pais de origen de la empresa'),
    body('company.logoUrl')
        .exists()
        .notEmpty()
        .withMessage('Ingrese el logo de la empresa')
        .isURL()
        .withMessage('Por favor suba el logo de la empresa'),
    body('message')
        .exists()
        .notEmpty()
        .withMessage('Rellene los campos faltantes')
]