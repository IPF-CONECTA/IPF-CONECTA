import { Idea } from '../ideaProject/ideaModel.js';
import { Vote } from './voteModel.js';

export const addVote = async (id, ideaId) => {
  try {
    const newVote = await Vote.create({
      profileId: id,
      ideaId,
    });
    console.log('New vote created:', newVote);

    return newVote;
  } catch (error) {
    console.error('Error adding vote:', error);
    throw error;
  }
};

export const deleteVote = async (id, ideaId) => {
  try {
    const deletedVote = await Vote.destroy({ where: { profileId: id, ideaId } });

    if (deletedVote === 0) {
      throw new Error("No se encontró ningún voto para eliminar.");
    }

    return deletedVote;
  } catch (error) {
    console.error('Error deleting vote:', error);
    throw error;
  }
};
