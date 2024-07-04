import { Router } from 'express';
import { associateNewCompanyCtrl } from './recruiterControllers.js';
import { isApprovedAssociation, isRecruiter } from '../../middlewares/jwt/isRecruiter.js';
import { createNewJobCtrl } from './job/jobControllers.js';
import { jobSchema } from './job/jobSchema.js';
import { validateSchema } from '../../middlewares/expressValidator.js';
import { jobSkillSchema } from './job/jobSkills/jobSkillSchema.js';
const recruiterRoutes = Router();

recruiterRoutes.post('/create-company', isRecruiter, associateNewCompanyCtrl)
recruiterRoutes.post('/create-job', jobSchema, validateSchema, isRecruiter, isApprovedAssociation, createNewJobCtrl)
// LA RUTA DE ARRIBA COMPRUEBA SI HAY UN TRABAJO DUPLICADO CON EL MISMO USUARIO Y EMPRESA
// LA DE ABAJO ES PARA CONFIRMAR Y CREAR EN CASO DE QUE SE QUIERA CREAR UN TRABAJO CON EL MISMO NOMBRE
recruiterRoutes.post('/create-duplicated-job', isRecruiter, isApprovedAssociation, createNewJobCtrl)

export default recruiterRoutes