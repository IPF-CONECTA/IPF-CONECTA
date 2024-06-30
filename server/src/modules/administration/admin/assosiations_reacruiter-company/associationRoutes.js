
import { Router } from 'express';
import { getAllAssociations } from './associationControllers.js';

const associationRoutes = Router();

associationRoutes.post('/get-associations', getAllAssociations)

export default associationRoutes;