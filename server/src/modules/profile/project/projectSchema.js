import { body } from "express-validator";

export const createProjectSchema = [
  body("project.name")
    .notEmpty()
    .withMessage("Ingrese el nombre del proyecto")
    .isLength({ min: 5 })
    .withMessage("El nombre del proyecto debe tener al menos 15 caracteres"),
  body("project.description")
    .notEmpty()
    .withMessage("Ingrese la descripcion del proyecto")
    .isLength({ min: 15 })
    .withMessage(
      "La descripcion del proyecto debe tener al menos 15 caracteres"
    ),
  body("project.smallDescription")
    .notEmpty()
    .withMessage("Ingrese la descripcion corta del proyecto")
    .isLength({ min: 5, max: 50 })
    .withMessage(
      "La descripcion corta del proyecto debe tener entre 5 y 50 caracteres"
    ),
  body("project.projectLink")
    .notEmpty()
    .withMessage("Ingrese el link del proyecto")
    .isURL()
    .withMessage("Ingrese un link valido."),
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
