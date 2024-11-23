import { Router } from "express";
<<<<<<< HEAD
import { findSkillsCtrl } from "./skillsControllers.js";
=======
import { findSkillsCtrl, createSkillCtrl, deleteSkillCtrl } from "./skillsControllers.js";
import { isToken } from "../../middlewares/jwt/isVerifiedAccount.js";
>>>>>>> 166135bf0ccd58015a96076590f7549fad98facc

const skillsRoutes = Router();


skillsRoutes.get("/find-skills", findSkillsCtrl);  // Buscar habilidades
skillsRoutes.post("/create-skill", createSkillCtrl);  // Crear habilidad
skillsRoutes.delete("/delete-skill/:id", deleteSkillCtrl);  // Eliminar habilidad



export default skillsRoutes;


