import { Router } from 'express';
import { getUsersController } from './userControllers.js';

const router = Router();

router.get('/getUsers', getUsersController)

export default router