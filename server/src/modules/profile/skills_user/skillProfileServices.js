import { Skillable } from "../../skills/skillable/skillableModel.js"
import { getSkillablesByIds } from "../../skills/skillable/skillableServices.js"
import { Experience } from "../experiences/experiencesModel.js"
import { Profile } from "../profileModel.js"
import { Project } from "../project/projectModel.js"

export const getSkillProfile = async (profileId, skillId) => {
    try {
        return await Skillable.findOne({ where: { skillableId: profileId, skillId, skillableType: "profile" } })
    } catch (error) {
        throw error
    }
}

export const getSkillsProfile = async (profileId) => {
    try {

        const profile = await Profile.findByPk(profileId, {
            attributes: ["id"],
            include: [{
                model: Project, attributes: ["id"]
            },
            {
                model: Experience, attributes: ["id"]
            }
            ]
        })
        const ids = [profileId]
        profile.experiences.map(experience => {
            ids.push(experience.id)
        }), profile.projects.map(project => {
            ids.push(project.id)
        })
        const skills = await getSkillablesByIds(ids)
        return skills
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