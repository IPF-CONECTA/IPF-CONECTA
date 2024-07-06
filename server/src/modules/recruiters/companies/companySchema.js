import { body } from "express-validator";
import { Company } from "./companyModel.js";

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
                }
            });
            if (existingCompany) {
                return Promise.reject(`La empresa ${value} ya esta registrada`);
            }
        }),
    body('company.description')
        .exists()
        .notEmpty()
        .withMessage('Ingrese la descripcion de la empresa'),
    body('company.cityId')
        .exists()
        .notEmpty()
        .withMessage('Ingrese la ciudad de la empresa'),
    body('company.industryId')
        .exists()
        .notEmpty()
        .withMessage('Ingrese la industria de la empresa'),
    body('company.address')
        .exists()
        .notEmpty()
        .withMessage('Ingrese la direccion de la empresa'),
    body('company.logoUrl')
        .exists()
        .notEmpty()
        .exists()
        .isURL()
        .withMessage('Ingrese el logo de la empresa'),
    body('company.cantEmployees')
        .exists()
        .notEmpty()
        .withMessage('Ingrese la cantidad de empleados (aproximado) de la empresa'),
]