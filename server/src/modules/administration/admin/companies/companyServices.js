import { Association } from "../../../recruiters/associations/associationModel.js"
import { Company } from "../../../recruiters/companies/companyModel.js"

// ==========================================
// || READ/UPDATE COMPANIAS NO VERIFICADAS ||
// ==========================================

export const getUnverifiedCompaniesSvc = async () => {
    try {
        const companies = await Company.findAll({
            where: {
                status: 'Pendiente'
            },
            attributes: ['id', 'logoUrl', 'name', 'industryId'],
            include: [{
                model: Association,
                attributes: ['userId']
            }]
        })

        if (companies.length == 0) throw new Error('No hay empresas pendientes de verificación')
        return companies
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getUnverifiedCompanyByIdSvc = async (id) => {
    try {
        const company = await Company.findByPk(id, {
            attributes: { exclude: ['status', 'justification', 'updatedAt'] }
        })
        return company
    } catch (error) {
        throw new Error(error.message)
    }
}

export const updateCompanyStatusSvc = async (id, status, justification) => {
    try {
        const existingCompany = await Company.findByPk(id)
        if (!existingCompany) throw new Error('No se encontro la empresa seleccionada')
        const updatedCompany = await Company.update({ status, justification }, { where: { id } })
        if (updatedCompany[0] === 0) throw new Error('Actualización fallida o empresa no encontrada');
        return updatedCompany
    } catch (error) {
        throw new Error(error.message)
    }
}

// ====================================
// || CRUD COMPANIAS VERIFICADAS     ||
// ====================================

export const getAllVerifiedCompanies = async () => {
    try {
        const companies = await Company.findAll({
            where: {
                status: 'Verificada'
            },
            attributes: [

            ]
        })
        if (companies.length == 0) throw new Error('No hay empresas verificadas')
        return companies
    } catch (error) {
        throw new Error(error.message)
    }
}


export const getVerifiedCompanyById = async (id) => {
    try {
        const company = await Company.findByPk(id)
        if (!company) throw new Error('No se encontro la empresa')
        return company
    } catch (error) {
        throw new Error(error.message)
    }
}

export const updateVerifiedCompany = async (id, company) => {
    try {
        const updatedCompany = await Company.update(company, { where: { id } })
        if (updatedCompany[0] === 0) throw new Error('Actualización fallida o empresa no encontrada');
        return updatedCompany
    } catch (error) {
        throw new Error(error.message)
    }
}

export const deleteVerifiedCompany = async (id) => {
    try {
        const deletedCompany = await Company.destroy({ where: { id } })
        if (deletedCompany === 0) throw new Error('Eliminación fallida o empresa no encontrada');
        return deletedCompany
    } catch (error) {
        throw new Error(error.message)
    }
}