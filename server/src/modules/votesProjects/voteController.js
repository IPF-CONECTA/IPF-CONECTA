import { addVote, getVotes, getVoteById } from "./voteService.js";

export const createVote = async (req, res) => {
    try {
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
