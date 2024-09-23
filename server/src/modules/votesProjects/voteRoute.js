import express from 'express';
import { createVote, fetchVotes, fetchVoteDetails, removeVote } from './voteController.js';

const router = express.Router();

router.post('/vote', createVote);

router.get('/ranking', fetchVotes);

router.get('/ranking/:id', fetchVoteDetails);

router.delete('/vote', removeVote);

export default router;