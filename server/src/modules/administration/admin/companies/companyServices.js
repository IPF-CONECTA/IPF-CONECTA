import { Profile } from "../../../profile/profileModel.js"
import { Association } from "../../../recruiters/associations/associationModel.js"
import { CompanyIndustry } from "../../../recruiters/companies/companyIndustry/companyIndustryModel.js"
import { Company } from "../../../recruiters/companies/companyModel.js"
import { Country } from "../../../locations/models/countryModel.js"
import { User } from "../../../users/userModel.js"



export const getCompaniesSvc = async (status, page) => {
    try {
        const companies = await Company.findAndCountAll({
            where: {
                status: status
            },
            limit: 12,
            offset: page * 12,
            attributes: ['id', 'logoUrl', 'name', 'industryId'],
            distinct: true,
            include: [{
                model: Association,
                attributes: ['id'],
                include: [{
                    model: Profile,
                    as: 'profile',
                    attributes: ['id', 'names', 'surnames']
                }]
            }],
        })


        return companies
    } catch (error) {
        throw new Error(error)
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
                    model: Profile,
                    as: 'profile',
                    attributes: ['id', 'profilePic', 'names', 'surnames'],
                    include: [{
                        model: User,
                        attributes: ['email', 'username']
                    }]
                },

                ]
            }, {
                model: CompanyIndustry,
                attributes: ['name']
            }, {
                model: Country,
                attributes: ['name', 'emoji']
            }]
        })
        return company
    } catch (error) {
        throw new Error(error.message)
    }
}

export const updateCompanyStatusSvc = async (id, status, justification) => {
    try {
        const existingCompany = await Company.findByPk(id, {
            include: [{
                model: Association,
                attributes: ['id'],
            }]
        })
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
        const deletedAssociations = await Association.destroy({ where: { companyId: id } })
        if (deletedAssociations === 0) throw new Error('Eliminación fallida o asociaciones no encontradas');
        return deletedCompany
    } catch (error) {
        throw new Error(error.message)
    }
}