import { Router } from "express";
import {
  associateNewCompanyCtrl,
  findCompanyCtrl,
  getApprovedCompaniesCtrl,
  sendContactCompanyCtrl,
  // uploadCompanyLogo,
} from "./companyControllers.js";
import { companySchema } from "./companySchema.js";
import { validateSchema } from "../../../middlewares/expressValidator.js";
import { isRecruiter } from "../../../middlewares/jwt/isRecruiter.js";
import { getCompanyByIdCtrl } from "../../administration/admin/companies/companyControllers.js";
import { upload } from "../../../multerConfig.js";

// Definimos las rutas
const companyRoutes = Router();

// Rutas existentes
companyRoutes.get("/get-companies", getApprovedCompaniesCtrl);
companyRoutes.get("/find-companies", findCompanyCtrl);
companyRoutes.get("/get-company/:id", getCompanyByIdCtrl);

// Combina subida de logo y creación de empresa
companyRoutes.post(
  "/create-company",  
  companySchema,
  validateSchema, upload.single('logoUrl'),
  associateNewCompanyCtrl
);

companyRoutes.post("/contact", sendContactCompanyCtrl);

export default companyRoutes;
