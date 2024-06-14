import { Company } from "../../../recruiters/companies/companyModel"

// ==========================================
// || READ/UPDATE COMPANIAS NO VERIFICADAS ||
// ==========================================

export const getAllNotVerifiedCompanies = async () => {
    try {
        const companies = await Company.findAll({
            where: {
                status: 'Pendiente'
            }
        })
        if (companies.length == 0) throw new Error('No hay empresas pendientes de verificación')
        return companies
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getNotVerifiedCompanyById = async (id) => {
    try {
        const company = await Company.findByPk(id)
        if (!company) throw new Error('No se encontro la empresa')
        return company
    } catch (error) {
        throw new Error(error.message)
    }
}

export const updateCompanyStatus = async (id, status) => {
    try {
        const updatedCompany = await Company.update({ status }, { where: { id } })
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
            }
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