import { body } from "express-validator";

export const jobSchema = [
  body("jobData.title").isString().withMessage("El título debe ser un string"),

  body("jobData.description")
    .notEmpty()
    .withMessage("La descripción es requerida")
    .isString()
    .withMessage("La descripción debe ser un string"),
  body("jobData.companyId").notEmpty().withMessage("La empresa es requerida"),
  body("jobData.modalityId")
    .notEmpty()
    .withMessage("La modalidad es requerida"),
  body("jobData.contractTypeId")
    .notEmpty()
    .withMessage("El tipo de contrato es requerido"),
  body("jobData.skills")
    .isArray()
    .notEmpty()
    .withMessage("Las habilidades son requeridas"),
];
