import { Router } from "express";
import { isToken } from "../../../middlewares/jwt/isVerifiedAccount.js";
import { toggleSkill } from "./skillableControllers.js";

const skillableRoutes = Router();

skillableRoutes.post("/skillable/:skillableId/:skillId", isToken, toggleSkill);

export default skillableRoutes;