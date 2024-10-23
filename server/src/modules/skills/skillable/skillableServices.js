import { Op } from "sequelize"
import { Skill } from "../skillsModel.js"
import { Skillable } from "./skillableModel.js"
import { getExperienceInfoByIdSvc } from "../../profile/experiences/experienceServices.js"
import { getProjectInfoByIdSvc } from "../../profile/project/projectService.js"

export const getSkillables = async (skillableId) => {
    try {
        let skills = await Skillable.findAll({
            where: { skillableId }, attributes: ["skillId"], include: [{
                model: Skill,
                attributes: ["name"],
                as: "skill"

            }],
        })
        return skills.map(skill => {
            return { id: skill.skillId, name: skill.skill.name }
        })
    } catch (error) {
        throw error
    }
}
export const getSkillablesByIds = async (ids) => {
    try {
        const skills = await Skillable.findAll({
            where: { skillableId: { [Op.in]: ids } }, include: [{
                model: Skill,
                attributes: ["name"],
                as: "skill"

            }],
        })
        const coso = {};
        for (const skill of skills) {
            if (!coso[skill.skill.name]) {
                coso[skill.skill.name] = { id: skill.skillId, items: [] };
            }
            const data = skill.skillableType === "experience"
                ? await getExperienceInfoByIdSvc(skill.skillableId)
                : skill.skillableType === "project"
                    ? await getProjectInfoByIdSvc(skill.skillableId)
                    : null;
            coso[skill.skill.name].items.push({ id: skill.skillableId, type: skill.skillableType, data });
        }

        return Object.entries(coso).map(([skillName, skillData]) => [skillName, skillData.items, skillData.id]);

    } catch (error) {
        throw error
    }
}

export const getSkillableById = async (skillableId, skillId) => {
    try {
        return await Skillable.findOne({ where: { skillableId, skillId } })
    } catch (error) {
        throw error
    }
}
export const createSkillables = async (skillableId, skills, skillableType, t) => {
    try {
        if (!Array.isArray(skills)) {
            return Skillable.create({ skillId: skills, skillableId, skillableType }, { transaction: t })
        }
        if (skills.length > 0) {
            await Promise.all(skills.map(skill =>
                Skillable.create({ skillId: skill, skillableId, skillableType }, { transaction: t })
            ));
        }
    } catch (error) {
        throw error
    }
}

export const createSkillable = async (skillId, skillableId, skillableType) => {
    try {
        return await Skillable.create({ skillId, skillableId, skillableType })
    } catch (error) {
        throw error
    }
}

export const deleteSkillable = async (skillableId, skillId) => {
    try {
        return Skillable.destroy({ where: { skillId, skillableId } })
    } catch (error) {
        throw error
    }
}