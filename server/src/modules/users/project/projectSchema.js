import { body } from "express-validator";

export const createProjectSchema = [
  body("project.name")
    .notEmpty()
    .withMessage("Ingrese el nombre del proyecto")
    .isLength({ min: 10 })
    .withMessage("El nombre del proyecto debe tener al menos 15 caracteres"),
  body("project.description")
    .notEmpty()
    .withMessage("Ingrese la descripcion del proyecto")
    .isLength({ min: 5 })
    .withMessage(
      "La descripcion del proyecto debe tener al menos 5 caracteres y maximo 30"
    ),
  body("project.status")
    .notEmpty()
    .withMessage("Ingrese un estado del proyecto")
    .isIn(["Comenzando", "Pendiente", "En progreso", "Finalizado"])
    .withMessage(
      "Estado del proyecto no valido, las opciones son: Comenzando, Pendiente, En progreso, Finalizado"
    ),
  body("project.projectLink")
    .notEmpty()
    .withMessage("Ingrese el link del proyecto")
    .isURL()
    .withMessage("Ingrese un link valido."),
  body("project.privacity")
    .notEmpty()
    .withMessage("Ingrese la privacidad del proyecto")
    .isIn(["publico", "privado"])
    .withMessage(
      "Privacidad del proyecto no valida, las opciones son: publico, privado"
    ),
];

export const updateProjectSchema = [
  body("project.name")
    .optional()
    .isLength({ min: 10 })
    .withMessage("El nombre del proyecto debe tener al menos 15 caracteres"),
  body("project.description")
    .optional()
    .isLength({ min: 5 })
    .withMessage(
      "La descripcion del proyecto debe tener al menos 5 caracteres y maximo 30"
    ),
  body("project.status")
    .optional()
    .isIn(["Comenzando", "Pendiente", "En progreso", "Finalizado"])
    .withMessage(
      "Estado del proyecto no valido, las opciones son: Comenzando, Pendiente, En progreso, Finalizado"
    ),
  body("project.projectLink")
    .optional()
    .isURL()
    .withMessage("Ingrese un link valido."),

  body("project.privacity")
    .isIn(["publico", "privado"])
    .withMessage(
      "Privacidad del proyecto no valida, las opciones son: publico, y privado"
    ),
];
