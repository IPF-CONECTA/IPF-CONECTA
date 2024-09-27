import { voteSvc } from "./voteServices.js";

export const voteCtrl = async (req, res) => {
    const { id } = req.user.profile;
    const { ideaId } = req.params;
    try {
        if (!id && ideaId) return res.status(400).json({ message: "Bad request" })
        const vote = await voteSvc(id, ideaId)
        if (vote == 2) { return res.status(201).json() }
        else if (vote == 1) return res.status(200).json()
        else return res.status(500).json()
    } catch (error) {
        res.status(500).json()
    }
}