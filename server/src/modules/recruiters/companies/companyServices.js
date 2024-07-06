import { Company } from './companyModel.js'

export const getAllCompanies = async () => {
    try {
        const companies = await Company.findAll({ where: { status: 'Aprobada' } })
        return companies
    } catch (error) {
        throw new Error(error.message)
    }

}

export const getCompanyById = async (id) => {
    try {
        const company = await Company.findByPk(id)
        return company
    } catch (error) {
        throw new Error(error.message)
    }

}

export const createCompany = async (company) => {
    // if (!company) throw new Error('Faltan datos')
    // const existingCompany = await Company.findOne({ where: { name: company.name } })
    // if (existingCompany) throw new Error('La empresa ya existe')
    try {
        const newCompany = await Company.create({
            name: company.name,
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
export const updateCompany = async (company) => {
    try {
        const updatedCompany = await Company.update({
            name: company.name,
            description: company.description,
            industryId: company.industryId,
            cityId: company.cityId,
            address: company.address,
            logoUrl: company.logoUrl,
            cantEmployees: company.cantEmployees,
        }, { where: { id: company.id } })
        if (!updatedCompany) throw new Error('No se pudo actualizar la empresa')
        return updatedCompany
    } catch (error) {
        throw new Error(error.message)
    }
}