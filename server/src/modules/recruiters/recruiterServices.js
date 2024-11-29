import { Association } from "./associations/associationModel.js"

export const useCompany = async (profileId, companyId) => {
    try {
        const association = await Association.create({ profileId, companyId })
        return association
    } catch (error) {
        throw new Error(error.message)
    }
}

