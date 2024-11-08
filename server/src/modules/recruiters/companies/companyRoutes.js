import { Router } from "express";
import {
  associateNewCompanyCtrl,
  findCompanyCtrl,
  getApprovedCompaniesCtrl,
  sendContactCompanyCtrl,
} from "./companyControllers.js";
import { companySchema } from "./companySchema.js";
import { validateSchema } from "../../../middlewares/expressValidator.js";
import { isRecruiter } from "../../../middlewares/jwt/isRecruiter.js";
import { isToken } from "../../../middlewares/jwt/isVerifiedAccount.js";
import { getCompanyByIdCtrl } from "../../administration/admin/companies/companyControllers.js";
import upload from "../../../config/multerConfig.js";
const companyRoutes = Router();

companyRoutes.get('/get-companies', getApprovedCompaniesCtrl)
companyRoutes.get('/find-companies', isToken, findCompanyCtrl)
companyRoutes.get('/get-company/:id', getCompanyByIdCtrl)
companyRoutes.post('/create-company', isToken, isRecruiter, upload.single("logoUrl"), companySchema, validateSchema, associateNewCompanyCtrl)
companyRoutes.post("/contact", sendContactCompanyCtrl);

export default companyRoutes;