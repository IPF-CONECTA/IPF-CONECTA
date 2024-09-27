import { Vote } from "../votesProjects/voteModel.js";
import { Idea } from "./ideaModel.js";

export const addIdeaSvc = async (idea) => {
  try {
    return await Idea.create(idea);
  } catch (error) {
    throw error;
  }
};

export const getIdeasSvc = async (id) => {
  try {
    const ideas = await Idea.findAll({
      include: [
        {
          model: Vote,
          as: 'votes',
          attributes: ['id', 'profileId'],
        },
      ]
    })
    return ideas;
  } catch (error) {
    throw error;
  }
};

export const getIdeaByIdSvc = async (id) => {
  try {
    return await Idea.findByPk(id);
  } catch (error) {
    throw error;
  }
};

export const updateIdeaSvc = async (id, idea) => {
  try {
    const [rows] = await Idea.update(idea, {
      where: { id },
    });
    return rows;
  } catch (error) {
    throw error;
  }
};

export const deleteIdeaSvc = async (id) => {
  try {
    const idea = await Idea.findByPk(id);
    await idea.destroy();
    return idea;
  } catch (error) {
    throw error;
  }
};
