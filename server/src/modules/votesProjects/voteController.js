import { addVote, getVotes, getVoteById, deleteVote } from "./voteService.js";
import { Vote } from './voteModel.js'; // Asegúrate de importar el modelo de Voto

export const createVote = async (req, res) => {
  const { userId, ideaId } = req.body; // Asume que el body tiene userId e ideaId

  try {
    // Verificar si el usuario ya ha votado
    const existingVote = await Vote.findOne({ where: { userId, ideaId } });
    if (existingVote) {
      return res.status(400).json({ message: 'Ya has votado por esta idea. Retira tu voto si deseas volver a votar.' });
    }

    const vote = await addVote(req.body);
    return res.status(201).json(vote);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const fetchVotes = async (req, res) => {
  try {
    const votes = await getVotes();
    return res.status(200).json(votes);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const fetchVoteDetails = async (req, res) => {
  try {
    const vote = await getVoteById(req.params.id);
    return res.status(200).json(vote);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const removeVote = async (req, res) => {
  try {
    const vote = await deleteVote(req.body);
    return res.status(200).json(vote);
  } catch (error) {
    console.error('Error removing vote:', error);
    return res.status(500).json({ error: error.message });
  }
};
