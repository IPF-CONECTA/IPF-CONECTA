import { likeSvc } from "./likeServices.js";

export const likeCtrl = async (req, res) => {
    const { id } = req.user;
    const { postId } = req.params;
    try {
        const like = await likeSvc(id, postId);
        if (like) return res.status(201).json({ message: "Like dado" });
        res.status(400).json({ message: "Error al dar like" });
    } catch (error) {
        res.status(500).json(error.message);
    }
}