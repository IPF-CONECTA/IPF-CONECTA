import express from 'express';
import { createVote, removeVote } from './voteController.js';
import { isToken } from '../../middlewares/jwt/isVerifiedAccount.js'

const router = express.Router();

router.post('/vote',isToken, createVote);

router.delete('/vote/:ideaId',isToken, removeVote);

export default router;