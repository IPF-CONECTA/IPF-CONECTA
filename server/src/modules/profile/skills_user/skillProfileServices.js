import { Skillable } from "../../skills/skillable/skillableModel.js"
import { Skill } from "../../skills/skillsModel.js"

export const getSkillProfile = async (profileId, skillId) => {
    try {
        return await Skillable.findOne({ where: { skillableId: profileId, skillId, skillableType: "profile" } })
    } catch (error) {
        throw error
    }
}

export const getSkillsProfile = async (profileId) => {
    try {
        return await Skillable.findAll({
            where: { skillableId: profileId, skillableType: "profile" },
            include: [
                {
                    model: Skill,
                    attributes: ["name"]
                }
            ]
        })
    } catch (error) {
        throw error
    }
}

export const createSkillProfile = async (profileId, skillId) => {
    try {
        return await Skillable.create({ skillableId: profileId, skillId, skillableType: "profile" })
    } catch (error) {
        throw error
    }
}

export const deleteSkillProfile = async (profileId, skillId) => {
    try {
        return await Skillable.destroy({ where: { skillableId: profileId, skillId, skillableType: "profile" } })
    } catch (error) {
        throw error
    }
}