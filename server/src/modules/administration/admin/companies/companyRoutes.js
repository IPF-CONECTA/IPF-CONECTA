import { Router } from 'express';
import { isAdmin } from '../../../../middlewares/jwt/isAdmin.js';
import { getCompaniesCtrl, updateCompanyStatusCtrl, getCompanyByIdCtrl } from './companyControllers.js';

const companyAdminRoutes = Router();

companyAdminRoutes.get('/get-companies/:status', getCompaniesCtrl)
companyAdminRoutes.get('/get-company/:id', getCompanyByIdCtrl)
companyAdminRoutes.patch('/update-company-status/:id/:status', updateCompanyStatusCtrl)

export default companyAdminRoutes