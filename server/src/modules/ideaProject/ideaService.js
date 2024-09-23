import { Idea } from "./ideaModel.js";

export const addIdea = async (idea) => {
  try {
    return await Idea.create(idea);
  } catch (error) {
    throw error;
  }
};

export const getIdeas = async () => {
  try {
    return await Idea.findAll();
  } catch (error) {
    throw error;
  }
};

export const getIdeaById = async (id) => {
  try {
    return await Idea.findByPk(id);
  } catch (error) {
    throw error;
  }
};

export const updateIdea = async (id, idea) => {
  try {
    const [rows] = await Idea.update(idea, {
      where: { id },
    });
    return rows;
  } catch (error) {
    throw error;
  }
};

export const deleteIdea = async (id) => {
  try {
    const idea = await Idea.findByPk(id);
    await idea.destroy();
    return idea;
  } catch (error) {
    throw error;
  }
};
