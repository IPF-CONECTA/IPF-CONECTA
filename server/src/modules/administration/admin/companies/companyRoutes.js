import { Router } from 'express';
import { isAdmin } from '../../../../middlewares/jwt/isAdmin.js';
import { getCompaniesCtrl, updateCompanyStatusCtrl, getCompanyByIdCtrl } from './companyControllers.js';

const companyAdminRoutes = Router();

companyAdminRoutes.get('/get-companies/:status', isAdmin, getCompaniesCtrl)
companyAdminRoutes.get('/get-company/:id', isAdmin, getCompanyByIdCtrl)
companyAdminRoutes.patch('/update-company-status/:id/:status', isAdmin, updateCompanyStatusCtrl)

export default companyAdminRoutes