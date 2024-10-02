import { getProfileIdByUsername } from "../../users/userServices.js";
import { updateAbout } from "./aboutServices.js";

export const updateAboutCtrl = async (req, res) => {
    const reqUser = req.user.profile.id;
    const { about, username } = req.body;
    try {
        const profileId = await getProfileIdByUsername(username)
        if (!about && !profileId) {
            return res.status(400).json()
        } else if (reqUser !== profileId) {
            return res.status(401).json()
        }
        const updatedAbout = await updateAbout(profileId, about)

        if (updatedAbout.length !== 1) {
            return res.status(500).json()
        }

        res.status(201).json()
    } catch (error) {
        console.log(error)
        res.status(500).json()
    }
}

export const deleteAboutCtrl = async (req, res) => {
    const reqUser = req.user.profile.id;
    const { username } = req.params;

    try {
        const profileId = await getProfileIdByUsername(username)
        if (!profileId) {
            return res.status(400).json
        } else if (reqUser !== profileId) {
            return res.status(401).json()
        }
        const deletedAbout = await updateAbout(profileId, "")
        if (deletedAbout.length !== 1) {
            return res.status(500).json()
        }

        res.status(201).json()
    } catch (error) {
        console.log(error)
        res.status(500).json()
    }
}