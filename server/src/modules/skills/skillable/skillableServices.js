import { Skill } from "../skillsModel.js"
import { Skillable } from "./skillableModel.js"

export const getSkillables = async (skillableId) => {
    try {
        const skills = await Skillable.findAll({
            where: { skillableId }, attributes: ["skillId"], include: [{
                model: Skill,
                attributes: ["name"],
                as: "skill"
            }],
        })
        return skills
    } catch (error) {
        throw error
    }
}
export const getSkillableById = async (skillableId) => {
    try {
        return await Skillable.findOne({ where: { skillableId } })
    } catch (error) {
        throw error
    }
}
export const createSkillables = async (skillableId, skills, skillableType, t) => {
    console.log(skills)
    try {
        if (!Array.isArray(skills)) {
            console.log('retorna aca')
            return Skillable.create({ skillId: skills, skillableId, skillableType }, { transaction: t })
        }
        if (skills.length > 0) {
            console.log('retorna aca 2')
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

export const deleteSkillable = async (skillId, skillableId) => {
    try {
        return Skillable.destroy({ where: { skillId, skillableId } })
    } catch (error) {
        throw error
    }
}