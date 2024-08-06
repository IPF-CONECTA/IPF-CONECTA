import { Router } from 'express';
import { isAdmin } from '../../../../middlewares/jwt/isAdmin.js';
import { getCompaniesCtrl, updateCompanyStatusCtrl, getCompanyByIdCtrl, deleteCompanyCtrl } from './companyControllers.js';

const companyAdminRoutes = Router();

companyAdminRoutes.get('/get-companies/:status', isAdmin, getCompaniesCtrl)
companyAdminRoutes.get('/get-company/:id', getCompanyByIdCtrl)
companyAdminRoutes.patch('/update-company-status/:id/:status', updateCompanyStatusCtrl)
companyAdminRoutes.put('/delete-company/:id', isAdmin, deleteCompanyCtrl)

export default companyAdminRoutes