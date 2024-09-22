
import { Idea } from '../ideaProject/ideaModel.js';
import { Vote } from './voteModel.js';

export const addVote = async (vote) => {
  try {
    const newVote = await Vote.create(vote);

    const idea = await Idea.findByPk(vote.ideaId);
    if (idea) {
      const votesCount = await Vote.count({ where: { ideaId: vote.ideaId } });
      idea.totalVotes = votesCount;
      await idea.save();
    }

    return { ...newVote.toJSON(), totalVotes: idea ? idea.totalVotes : 0 };
  } catch (error) {
    throw error;
  }
};

export const getVotes = async () => {
  try {
    return await Vote.findAll();
  } catch (error) {
    throw error;
  }
};

export const getVoteById = async (id) => {
  try {
    return await Vote.findByPk(id);
  } catch (error) {
    throw error;
  }
};

