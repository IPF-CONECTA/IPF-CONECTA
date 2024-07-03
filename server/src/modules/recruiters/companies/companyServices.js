import { Company } from './companyModel.js'

export const createCompany = async (company) => {
    if (!company) throw new Error('Faltan datos')
    const existingCompany = await Company.findOne({ where: { companyName: company.companyName } })
    if (existingCompany) throw new Error('La empresa ya existe')
    try {
        const newCompany = await Company.create({
            companyName: company.companyName,
            description: company.description,
            industryId: company.industryId,
            cityId: company.cityId,
            address: company.address,
            logoUrl: company.logoUrl,
            cantEmployees: company.cantEmployees,
        })
        if (!newCompany) throw new Error('No se pudo crear la empresa')
        return newCompany
    } catch (error) {
        throw new Error(error.message)
    }
}
