// Controlador para vincular o desvincular una habilidad a un usuario
import { getProfileById } from '../../profile/profileServices.js';
import { getSkillByPk } from '../../skills/skillsServices.js';
import { getProfileIdByUsername } from '../userServices.js';
import { createSkillProfile, deleteSkillProfile, getSkillProfile, getSkillsProfile } from './skillProfileServices.js';

export const toggleSkill = async (req, res) => {
    const { skillId } = req.params;
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

        const existingSkillProfile = await getSkillProfile(id, skillId)
        console.log(existingSkillProfile)
        if (existingSkillProfile) {
            await deleteSkillProfile(id, skillId)
            return res.status(200).json()
        }

        await createSkillProfile(id, skillId)
        res.status(201).json();
    } catch (error) {
        res.status(500).json({ message: 'Error al vincular habilidad', error: error.message });
    }
};

// Controlador para obtener las habilidades del usuario autenticado
// Controlador para obtener las habilidades del perfil del usuario autenticado
export const getProfileSkills = async (req, res) => {
    const { username } = req.params;

    try {
        const profileId = await getProfileIdByUsername(username)
        const skillsProfile = await getSkillsProfile(profileId)
        if (!skillsProfile || skillsProfile.length === 0) {
            return res.status(404).json();
        }
        res.status(200).json(skillsProfile);
    } catch (error) {
        console.log(error)
        res.status(500).json();
    }
};

