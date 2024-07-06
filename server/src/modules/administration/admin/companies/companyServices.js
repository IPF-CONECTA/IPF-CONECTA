import { Association } from "../../../recruiters/associations/associationModel.js"
import { Company } from "../../../recruiters/companies/companyModel.js"
import { User } from "../../../users/userModel.js"



export const getCompaniesSvc = async (status) => {
    try {
        const companies = await Company.findAll({
            where: {
                status: status
            },
            attributes: ['id', 'logoUrl', 'name', 'industryId'],
            include: [{
                model: Association,
                attributes: ['id'],
                include: [{
                    model: User,
                    as: 'user',
                    attributes: ['names', 'surnames']
                }]
            }]
        })

        if (companies.length == 0) throw new Error('No se encontraron empresas')
        return companies
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getCompanyByIdSvc = async (id) => {
    try {
        const company = await Company.findByPk(id, {
            attributes: { exclude: ['status', 'justification', 'updatedAt'] },
            include: [{
                model: Association,
                attributes: ['id'],
                include: [{
                    model: User,
                    as: 'user',
                    attributes: ['id', 'profilePic', 'names', 'surnames', 'email']
                }]
            }]
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

        if (status == 'Aprobada') {
            justification = null
        }

        const updatedCompany = await Company.update({ status, justification }, { where: { id } })
        if (updatedCompany[0] === 0) throw new Error('Actualización fallida o empresa no encontrada');

        return updatedCompany
    } catch (error) {
        throw new Error(error.message)
    }
}

export const deleteCompanySvc = async (id) => {
    try {
        const deletedCompany = await Company.destroy({ where: { id } })
        if (deletedCompany === 0) throw new Error('Eliminación fallida o empresa no encontrada');
        return deletedCompany
    } catch (error) {
        throw new Error(error.message)
    }
}