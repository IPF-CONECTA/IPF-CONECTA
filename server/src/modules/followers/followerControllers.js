import { getProfileIdByUsername } from "../users/userServices.js";
import { followOrUnfollowSvc, getConnectionsSvc } from "./followerServices.js";

export const followOrUnfollowCtrl = async (req, res) => {
    const { id } = req.user.profile;
    const { username } = req.params;
    try {
        const idToFollow = await getProfileIdByUsername(username);
        if (id == idToFollow) return res.status(400).json()
        const response = await followOrUnfollowSvc(id, idToFollow);
        if (!response) return res.status(500).json({ message: "Hubo un error al seguir/dejar de seguir" });
        res.status(201).json(response);
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message);
    }
}

export const getConnectionsCtrl = async (req, res) => {
    const { id } = req.user.profile;
    const { type, username } = req.params;
    try {

        if (type !== "followers" && type !== "following") return res.status(400).json();
        const profileId = await getProfileIdByUsername(username)
        const connections = await getConnectionsSvc(profileId, type, id);
        res.status(200).json(connections);
    } catch (error) {
        res.status(500).json(error.message);
    }
}