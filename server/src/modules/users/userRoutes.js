import { Router } from 'express';
import { createUserController, getUsersController } from './userControllers.js';

const router = Router();

router.get('/getUsers', getUsersController)

router.post('/createUser', createUserController)

export default router