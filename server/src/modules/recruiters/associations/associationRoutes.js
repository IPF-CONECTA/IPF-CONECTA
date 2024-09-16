import { Router } from "express";
import { associateCompanyCtrl, getApprovedAssociationsByUserCtrl } from "./associationControllers.js";
import { isRecruiter } from "../../../middlewares/jwt/isRecruiter.js";
import { isToken } from "../../../middlewares/jwt/isVerifiedAccount.js";

const associationRoutes = Router()

associationRoutes.post('/associate-company', isToken, isRecruiter, associateCompanyCtrl)
associationRoutes.get('/get-companies-by-user', isToken, isRecruiter, getApprovedAssociationsByUserCtrl)

export default associationRoutes