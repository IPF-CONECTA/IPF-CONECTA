import { Router } from "express";
import { findSkillsCtrl } from "./skillsControllers.js";

const skillsRoutes = Router();

skillsRoutes.get("/find-skills", findSkillsCtrl)

export default skillsRoutes;