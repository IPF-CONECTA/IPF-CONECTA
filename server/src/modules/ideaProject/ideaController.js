import { addIdeaSvc, deleteIdeaSvc, getIdeaByIdSvc, getIdeasSvc, updateIdeaSvc } from "./ideaService.js";

export const createIdea = async (req, res) => {
  try {
    const idea = await addIdeaSvc(req.body);
    return res.status(201).json(idea);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getIdeas = async (req, res) => {

  const { id } = req.user.profile;

  try {
    const ideas = await getIdeasSvc(id);
    return res.status(200).json(ideas);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getIdeaDetails = async (req, res) => {
  try {
    const idea = await getIdeaByIdSvc(req.params.id);
    return res.status(200).json(idea);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateIdea = async (req, res) => {
  try {
    const idea = await updateIdeaSvc(req.params.id, req.body);
    return res.status(200).json(idea);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteIdea = async (req, res) => {
  try {
    const idea = await deleteIdeaSvc(req.params.id);
    return res.status(200).json(idea);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
