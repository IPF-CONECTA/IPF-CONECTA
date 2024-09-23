import express from 'express';
import { createVote, fetchVotes, fetchVoteDetails } from './voteController.js';

const router = express.Router();

router.post('/vote', createVote);

router.get('/ranking', fetchVotes);

router.get('/ranking/:id', fetchVoteDetails);

export default router;