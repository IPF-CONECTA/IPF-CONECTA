import {
  addIdea,
  getIdeaById,
  getIdeas,
  updateIdea,
  deleteIdea,
} from "./ideaService.js";

export const createIdea = async (req, res) => {
  try {
    const idea = await addIdea(req.body);
    return res.status(201).json(idea);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const fetchIdeas = async (req, res) => {
  try {
    const ideas = await getIdeas();
    return res.status(200).json(ideas);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const fetchProjectDetails = async (req, res) => {
  try {
    const idea = await getIdeaById(req.params.id);
    return res.status(200).json(idea);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const modifyIdea = async (req, res) => {
  try {
    const idea = await updateIdea(req.params.id, req.body);
    return res.status(200).json(idea);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const eraseIdea = async (req, res) => {
  try {
    const idea = await deleteIdea(req.params.id);
    return res.status(200).json(idea);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
