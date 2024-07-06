import { Router } from "express";
import { associateNewCompanyCtrl, sendContactCompanyCtrl } from "./companyControllers.js";
import { companySchema } from "./companySchema.js";
import { validateSchema } from "../../../middlewares/expressValidator.js";
import { isRecruiter } from "../../../middlewares/jwt/isRecruiter.js";

const companyRoutes = Router();
companyRoutes.post('/create-company', isRecruiter, companySchema, validateSchema, associateNewCompanyCtrl)

companyRoutes.post('/contact', sendContactCompanyCtrl)

export default companyRoutes;