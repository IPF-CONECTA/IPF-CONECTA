import { Association } from "../../../recruiters/associations/associationModel.js"
import { Company } from "../../../recruiters/companies/companyModel.js"
import { User } from "../../../users/userModel.js"

export const getAssociations = async (status) => {
    try {
        const associations = await Association.findAll({
            where: { status: status },
            attributes: ['id'],
            include: [{
                model: User,
                as: 'user',
                attributes: ['id', 'names', 'surnames'],
            }, {

                model: Company,
                as: 'company',
                attributes: ['id', 'logoUrl', 'name', 'industryId'],
            }
            ]
        })
        if (associations.length == 0) throw new Error('No hay verificaciones pendientes')
        return associations
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getAssociationById = async (id) => {
    try {
        const association = await Association.findByPk(id, {
            where: { status: 'Pendiente' },
            attributes: ['id', 'message'],
            include: [{
                model: User,
                as: 'user',
                attributes: ['id', 'profilePic', 'names', 'surnames', 'email'],
            }, {
                model: Company,
                as: 'company',
                attributes: ['id', 'logoUrl', 'name', 'description', 'industryId', 'cityId', 'address', 'cantEmployees'],
            }
            ]
        })
        if (!association) throw new Error('No se encontro la verificacion')
        return association
    } catch (error) {
        throw new Error(error.message)
    }
}

export const updateAssociation = async (id, status) => {
    try {
        const isApprovedAssociation = await Association.findByPk(id)
        if (!isApprovedAssociation) throw new Error('No se encontro la asociacion')
        if (isApprovedAssociation.status == 'Aprobada') throw new Error('La asociacion ya fue aprobada')
        const updatedAssociation = await Association.update({ status }, { where: { id } })
        if (updatedAssociation[0] === 0) throw new Error('Actualización fallida o verificación no encontrada');
        return updatedAssociation
    } catch (error) {
        throw new Error(error.message)
    }
}