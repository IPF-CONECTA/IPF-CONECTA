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
import { isVerifiedAccount } from "../../../middlewares/jwt/isVerifiedAccount.js";
import { getCompanyByIdCtrl } from "../../administration/admin/companies/companyControllers.js";

const companyRoutes = Router();

<<<<<<< HEAD
companyRoutes.get('/get-companies', getApprovedCompaniesCtrl)
companyRoutes.get('/find-companies', findCompanyCtrl)
companyRoutes.get('/get-company/:id', getCompanyByIdCtrl)
companyRoutes.post('/create-company', isRecruiter, companySchema, validateSchema, associateNewCompanyCtrl)
=======
companyRoutes.get("/get-companies", getApprovedCompaniesCtrl);
companyRoutes.get("/find-companies/:query", findCompanyCtrl);
companyRoutes.get("/get-company/:id", getCompanyByIdCtrl);
companyRoutes.post(
  "/create-company",
  isRecruiter,
  companySchema,
  validateSchema,
  associateNewCompanyCtrl
);
>>>>>>> 4460fb9bedcb00e508bbf83086f404bcac0ec9b3

companyRoutes.post("/contact", sendContactCompanyCtrl);

export default companyRoutes;
