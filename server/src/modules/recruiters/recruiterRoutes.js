import { Router } from 'express';
import { associateNewCompanyCtrl } from './recruiterControllers.js';
import { isApprovedAssociation, isRecruiter } from '../../middlewares/jwt/isRecruiter.js';
import { createNewJobCtrl } from './job/jobControllers.js';
import { jobSchema } from './job/jobSchema.js';
import { validateSchema } from '../../middlewares/expressValidator.js';
const recruiterRoutes = Router();

recruiterRoutes.post('/create-new-company', isRecruiter, associateNewCompanyCtrl)
recruiterRoutes.post('/create-new-job', jobSchema, validateSchema, isRecruiter, isApprovedAssociation, createNewJobCtrl)

export default recruiterRoutes