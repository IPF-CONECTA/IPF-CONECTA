import { Profile } from "./profileModel.js"

export const getProfileSvc = async (id) => {
    try {
        return Profile.findByPk(id)
    } catch (error) {
        throw error
    }
}