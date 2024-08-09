import { followOrUnfollowSvc } from "./followerServices.js";

export const followOrUnfollowCtrl = async (req, res) => {
    const { id } = req.user;
    const { idToFollow } = req.params;
    console.log('==================================================================')
    try {
        const response = await followOrUnfollowSvc(id, idToFollow);
        if (!response) return res.status(400).json({ message: "Hubo un error al seguir/dejar de seguir" });
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
}