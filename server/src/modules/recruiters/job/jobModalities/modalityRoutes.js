import { Router } from "express";
import { getModalitiesCtrl } from "./modalityControllers.js";
import { isToken } from "../../../../middlewares/jwt/isVerifiedAccount.js";
const modalityRoutes = Router();

modalityRoutes.get('/get-modalities', isToken, getModalitiesCtrl)

export default modalityRoutes