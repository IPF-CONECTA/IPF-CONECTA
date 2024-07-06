
import { Router } from 'express';
import { getAllAssociations, getAssociationByIdCtrl, updateAssociationCtrl } from './associationControllers.js';
import { isAdmin } from '../../../../middlewares/jwt/isAdmin.js';

const associationRoutes = Router();

associationRoutes.get('/get-associations', isAdmin, getAllAssociations)
associationRoutes.get('/get-association/:id', isAdmin, getAssociationByIdCtrl)
associationRoutes.patch('/update-association/:id/:status', isAdmin, updateAssociationCtrl)

export default associationRoutes;