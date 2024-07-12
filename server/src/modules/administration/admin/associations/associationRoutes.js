
import { Router } from 'express';
import { getAllAssociations, getAssociationByIdCtrl, updateAssociationCtrl } from './associationControllers.js';
import { isAdmin } from '../../../../middlewares/jwt/isAdmin.js';

const associationAdminRoutes = Router();

associationAdminRoutes.get('/get-associations/:status', isAdmin, getAllAssociations)
associationAdminRoutes.get('/get-association/:id', isAdmin, getAssociationByIdCtrl)
associationAdminRoutes.patch('/update-association-status/:id/:status', isAdmin, updateAssociationCtrl)

export default associationAdminRoutes;