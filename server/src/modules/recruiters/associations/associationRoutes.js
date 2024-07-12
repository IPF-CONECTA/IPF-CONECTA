import { Router } from "express";
import { associateCompanyCtrl } from "./associationControllers.js";
import { isRecruiter } from "../../../middlewares/jwt/isRecruiter.js";

const associationRoutes = Router()

associationRoutes.post('/associate-company', isRecruiter, associateCompanyCtrl)

export default associationRoutes