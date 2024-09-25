import { addVote, deleteVote } from "./voteService.js";
import { Vote } from './voteModel.js';

export const createVote = async (req, res) => {
  const { ideaId } = req.body; 
  const {id} = req.user.profile;

  try {
    const existingVote = await Vote.findOne({ where: { id, ideaId } });
    if (existingVote) {
      console.log('Vote already exists for user:', existingVote);
      return res.status(400).json({ message: 'Ya has votado por esta idea. Retira tu voto si deseas volver a votar.' });
    }

    const vote = await addVote(id, ideaId);

    return res.status(201).json(vote);
  } catch (error) {
    console.error('Error creating vote:', error);
    return res.status(500).json({ error: error.message });
  }
};

export const removeVote = async (req, res) => {
  const { ideaId } = req.params;
  const { id } = req.user.profile;
  try {
    const vote = await deleteVote(id, ideaId);
    console.log('Vote removed successfully:', vote);
    return res.status(200).json(vote);
  } catch (error) {
    console.error('Error removing vote:', error);
    return res.status(500).json({ error: error.message });
  }
};
