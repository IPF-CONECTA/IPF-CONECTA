import { Router } from 'express';
import { isAdmin } from '../../../../middlewares/jwt/isAdmin.js';
import { getUnverifiedCompaniesCtrl, getUnverifiedCompanyByIdCtrl, updateCompanyStatusCtrl } from './companyControllers.js';

const companyAdminRoutes = Router();

companyAdminRoutes.get('/get-unverified-companies', isAdmin, getUnverifiedCompaniesCtrl)
companyAdminRoutes.get('/get-unverified-company/:id', isAdmin, getUnverifiedCompanyByIdCtrl)
companyAdminRoutes.patch('/update-company-status/:id/:status', isAdmin, updateCompanyStatusCtrl)

export default companyAdminRoutes