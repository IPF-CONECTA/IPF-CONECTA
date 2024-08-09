import { Router } from "express";
import { associateCompanyCtrl } from "./associationControllers.js";
import { isRecruiter } from "../../../middlewares/jwt/isRecruiter.js";
import { isToken } from "../../../middlewares/jwt/isVerifiedAccount.js";

const associationRoutes = Router()

        associationRoutes.post('/associate-company', isToken, isRecruiter, associateCompanyCtrl)

export default associationRoutes