import { repostSvc } from "./repostServices.js";

export const repostCtrl = async (req, res) => {
    const { id } = req.user.profile;
    const { postId } = req.body;
    try {
        if (!postId) return res.status(400).json({ message: "Debes proporcionar el id de la publicación" });
        const repost = await repostSvc(id, postId);
        if (repost) return res.status(201).json()
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}