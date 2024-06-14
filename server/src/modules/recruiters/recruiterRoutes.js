import { Router } from 'express';
import { associateNewCompanyCtrl } from './recruiterControllers.js';
const recruiterRoutes = Router();

recruiterRoutes.post('/create-new-company', associateNewCompanyCtrl)

export default recruiterRoutes