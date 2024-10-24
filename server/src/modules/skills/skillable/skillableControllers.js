import { getProfileById } from "../../profile/profileServices.js";
import { getSkillByPk } from "../skillsServices.js";
import { createSkillable, deleteSkillable, getSkillableById } from "./skillableServices.js";

export const toggleSkill = async (req, res) => {
    const { skillId, skillableId } = req.params;
    const { id } = req.user.profile;

    try {
        const existingUser = await getProfileById(id)
        if (!existingUser) {
            return res.status(404).json({ message: 'El usuario no existe.' });
        }

        const existingSkill = await getSkillByPk(skillId);
        if (!existingSkill) {
            return res.status(404).json({ message: 'La habilidad no existe.' });
        }

        const existingSkillProfile = await getSkillableById(skillableId, skillId)
        if (existingSkillProfile) {
            await deleteSkillable(skillableId, skillId)
            return res.status(200).json()
        }

        await createSkillable(skillId, skillableId, "profile")
        res.status(201).json();
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al vincular habilidad', error: error.message });
    }
};