import { Company } from './companyModel.js'

export const createCompany = async (company) => {
    if (!company) throw new Error('Faltan datos')
    try {
        const newCompany = await Company.create(company)
        if (!newCompany) throw new Error('No se pudo crear la empresa')
        return newCompany
    } catch (error) {
        throw new Error(error.message)
    }
}
