import { Profile } from "../../profile/profileModel.js"
import { Skill } from "../../skills/skillsModel.js"
import { User } from "../userModel.js"
import { SkillsProfile } from "./skillProfileModel.js"

export const getSkillProfile = async (profileId, skillId) => {
    try {
        return await SkillsProfile.findOne({ where: { profileId, skillId } })
    } catch (error) {
        throw error
    }
}

export const getSkillsProfile = async (profileId) => {
    try {
        return await SkillsProfile.findAll({
            where: { profileId },
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
        return await SkillsProfile.create({ profileId, skillId })
    } catch (error) {
        throw error
    }
}

export const deleteSkillProfile = async (profileId, skillId) => {
    try {
        return await SkillsProfile.destroy({ where: { profileId, skillId } })
    } catch (error) {
        throw error
    }
}