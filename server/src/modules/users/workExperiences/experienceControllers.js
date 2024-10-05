import { getProfileIdByUsername } from "../userServices.js";
import { createExperienceSvc, getExperiencesSvc } from "./experienceServices.js";

export const getExperiencesByProfile = async (req, res) => {
    const { username } = req.params;
    try {
        if (!username) return res.status(400).json();

        const profileId = await getProfileIdByUsername(username)
        const experiences = await getExperiencesSvc(profileId);
        if (experiences.length == 0) return res.status(404).json();

        res.status(200).json(experiences);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const createExperience = async (req, res) => {
    const { id } = req.user.profile;
    const { username } = req.params;
    const { experience } = req.body;
    try {
        const reqProfileId = await getProfileIdByUsername(username)
        if (!id && !reqProfileId) {
            return res.status(400).json()
        } else if (id !== reqProfileId) {
            return res.status(401).json()
        }

        await createExperienceSvc(experience, id);
        res.status(201).json()
    } catch (error) {
        console.log(error)
        res.status(500).json()
    }
}