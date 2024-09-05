import { WorkExperience } from "./experiencesModel.js"

export const getExperiencesSvc = (userRequestId, profileId) => {
    try {
        const experiences = WorkExperience.findAll({
            where: {
                profileId
            }
        })
        return { experiences, own: profileId == userRequestId ? true : false }
    } catch (error) {
        throw error
    }
}