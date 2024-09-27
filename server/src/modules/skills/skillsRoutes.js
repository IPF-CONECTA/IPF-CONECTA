import { Router } from "express";
import { findSkillsCtrl } from "./skillsControllers.js";
import { isToken } from "../../middlewares/jwt/isVerifiedAccount.js";

const skillsRoutes = Router();

skillsRoutes.get("/find-skills", findSkillsCtrl)

export default skillsRoutes;