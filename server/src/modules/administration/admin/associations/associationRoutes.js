
import { Router } from 'express';
import { getAllAssociations, getAssociationByIdCtrl, updateAssociationCtrl } from './associationControllers.js';
import { isAdmin } from '../../../../middlewares/jwt/isAdmin.js';

const associationRoutes = Router();

associationRoutes.get('/get-associations/:status', isAdmin, getAllAssociations)
associationRoutes.get('/get-association/:id', isAdmin, getAssociationByIdCtrl)
associationRoutes.patch('/update-association-status/:id/:status', isAdmin, updateAssociationCtrl)

export default associationRoutes;