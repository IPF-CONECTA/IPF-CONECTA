import { Association } from "./associations/associationModel.js"
import { createCompany } from "./companies/companyServices.js"
import { Company } from "./companies/companyModel.js"


export const getAllCompanies = async () => {
    try {
        const companies = await Company.findAll({ where: { status: 'Aprobada' } })
        return companies
    } catch (error) {
        throw new Error(error.message)
    }

}

export const useCompany = async (userId, companyId) => {
    try {
        const association = await Association.create({ userId, companyId })
        return association
    } catch (error) {
        throw new Error(error.message)
    }
}

export const createAssociation = async (message, userId, company) => {
    try {
        const newCompany = await createCompany(company)
        const association = await Association.create({ userId, companyId: newCompany.id, message })
        return association
    } catch (error) {
        throw new Error(error.message)
    }
}
