import { Router } from "express";
import { associateNewCompanyCtrl, getApprovedCompaniesCtrl, sendContactCompanyCtrl } from "./companyControllers.js";
import { companySchema } from "./companySchema.js";
import { validateSchema } from "../../../middlewares/expressValidator.js";
import { isRecruiter } from "../../../middlewares/jwt/isRecruiter.js";
import { isVerifiedAccount } from "../../../middlewares/jwt/isVerifiedAccount.js";

const companyRoutes = Router();

companyRoutes.get('/get-approved-companies', getApprovedCompaniesCtrl)
companyRoutes.post('/create-company', isRecruiter, isVerifiedAccount, companySchema, validateSchema, associateNewCompanyCtrl)

companyRoutes.post('/contact', sendContactCompanyCtrl)

export default companyRoutes;