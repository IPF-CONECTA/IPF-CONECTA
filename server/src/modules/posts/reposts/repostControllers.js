import { repostSvc } from "./repostServices.js";

export const repostCtrl = async (req, res) => {
    const { id } = req.user;
    const { postId } = req.body;
    try {
        if (!postId) return res.status(400).json({ message: "Debes proporcionar el id de la publicación" });
        await repostSvc(id, postId);
        res.status(200).json({ message: "Repost realizado con éxito" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }


}