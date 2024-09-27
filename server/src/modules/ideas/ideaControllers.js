import { addIdeaSvc, deleteIdeaSvc, getIdeaByIdSvc, getIdeasOrderByVotesSvc, getIdeasSvc, updateIdeaSvc } from "./ideaServices.js";

export const createIdea = async (req, res) => {
    const { id } = req.user.profile;
    const { idea } = req.body;
    try {
        const newIdea = await addIdeaSvc(idea, id);
        if (!newIdea) return res.status(400).json({ message: "Error al crear la idea" });
        return res.status(201).json(newIdea);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getIdeas = async (req, res) => {
    const profileId = req.user?.profile.id;
    try {
        const ideas = await getIdeasSvc(profileId);
        console.log(ideas)
        if (ideas.length === 0) return res.status(404).json({ message: "No se encontraron ideas" });
        return res.status(200).json(ideas);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const getIdeasOBVotes = async (req, res) => {
    const profileId = req.user?.profile.id;
    try {
        const ideas = await getIdeasOrderByVotesSvc(profileId);
        if (ideas.length === 0) return res.status(404).json({ message: "No se encontraron ideas" });
        return res.status(200).json(ideas);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
    }
};

export const getIdeaDetails = async (req, res) => {
    try {
        const idea = await getIdeaByIdSvc(req.params.id);
        if (!idea) return res.status(404).json({ message: "No se encontro la idea" });
        return res.status(200).json(idea);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateIdea = async (req, res) => {
    try {
        const idea = await updateIdeaSvc(req.params.id, req.body);
        return res.status(201).json(idea);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteIdea = async (req, res) => {
    try {
        const idea = await deleteIdeaSvc(req.params.id);
        return res.status(201).json(idea);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};