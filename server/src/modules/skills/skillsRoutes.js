import { Router } from "express";
import { findSkillsCtrl, createSkillCtrl, deleteSkillCtrl } from "./skillsControllers.js";
import { isToken } from "../../middlewares/jwt/isVerifiedAccount.js";

const skillsRoutes = Router();


skillsRoutes.get("/find-skills", findSkillsCtrl);  // Buscar habilidades
skillsRoutes.post("/create-skill", createSkillCtrl);  // Crear habilidad
skillsRoutes.delete("/delete-skill/:id", deleteSkillCtrl);  // Eliminar habilidad



export default skillsRoutes;


