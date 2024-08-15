import { Router } from "express";
import {
  associateNewCompanyCtrl,
  findCompanyCtrl,
  getApprovedCompaniesCtrl,
  sendContactCompanyCtrl,
  uploadCompanyLogo
} from "./companyControllers.js";  
import { companySchema } from "./companySchema.js";
import { validateSchema } from "../../../middlewares/expressValidator.js";
import { isRecruiter } from "../../../middlewares/jwt/isRecruiter.js";
import { isVerifiedAccount } from "../../../middlewares/jwt/isVerifiedAccount.js";
import { getCompanyByIdCtrl } from "../../administration/admin/companies/companyControllers.js";
import { upload } from "../../../multerConfig.js"

// Definimos las rutas
const companyRoutes = Router();

// Rutas existentes
companyRoutes.get('/get-companies', getApprovedCompaniesCtrl);
companyRoutes.get('/find-companies', findCompanyCtrl);
companyRoutes.get('/get-company/:id', getCompanyByIdCtrl);
companyRoutes.post('/create-company', companySchema, validateSchema, associateNewCompanyCtrl);
companyRoutes.post("/contact", sendContactCompanyCtrl);

// Nueva ruta para subir el logo y crear una empresa
companyRoutes.post('/uploadCompanyLogo', isRecruiter, upload.single('logo'), uploadCompanyLogo);

export default companyRoutes;