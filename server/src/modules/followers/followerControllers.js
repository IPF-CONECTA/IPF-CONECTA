import { followOrUnfollowSvc } from "./followerServices.js";

export const followOrUnfollowCtrl = async (req, res) => {
    const { id } = req.user.profile;
    const { idToFollow } = req.params;
    try {
        if (id == idToFollow) return res.status(400).json()
        const response = await followOrUnfollowSvc(id, idToFollow);
        if (!response) return res.status(500).json({ message: "Hubo un error al seguir/dejar de seguir" });
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
}