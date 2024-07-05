import { body } from "express-validator";

export const companySchema = [
    body('company.name')
        .notEmpty()
        .withMessage('Ingrese el nombre de la empresa'),
    body('company.description')
        .notEmpty()
        .withMessage('Ingrese la descripcion de la empresa'),
    body('company.cityId')
        .notEmpty()
        .withMessage('Ingrese la ciudad de la empresa'),
    body('company.industryId')
        .notEmpty()
        .withMessage('Ingrese la industria de la empresa'),
    body('company.address')
        .notEmpty()
        .withMessage('Ingrese la direccion de la empresa'),
    body('company.logoUrl')
        .notEmpty()
        .isURL()
        .withMessage('Ingrese el logo de la empresa'),
    body('company.cantEmployees')
        .notEmpty()
        .withMessage('Ingrese la cantidad de empleados (aproximado) de la empresa'),
]