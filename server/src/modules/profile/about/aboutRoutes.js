import { Router } from "express";

import { isToken } from "../../../middlewares/jwt/isVerifiedAccount.js";
import { deleteAboutCtrl, updateAboutCtrl } from "./aboutControllers.js";

const aboutRoutes = Router();

aboutRoutes.patch("/about", isToken, updateAboutCtrl)
aboutRoutes.delete("/about/:username", isToken, deleteAboutCtrl)

export default aboutRoutes