import { Association } from "../../../recruiters/associations/associationModel.js"

export const getAssociations = async () => {
    try {
        const associations = await Association.findAll({ where: { status: 'Pendiente' }, include: ['user', 'company'] })
        if (associations.length == 0) throw new Error('No hay verificaciones pendientes')
        return associations
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getAssociationById = async (id) => {
    try {
        const association = await Association.findByPk(id)
        if (!association) throw new Error('No se encontro la verificacion')
        return association
    } catch (error) {
        throw new Error(error.message)
    }
}

export const updateAssociation = async (id, status) => {
    try {
        const updatedAssociation = await Association.update({ status }, { where: { id } })
        if (updatedAssociation[0] === 0) throw new Error('Actualización fallida o verificación no encontrada');
        return updatedAssociation
    } catch (error) {
        throw new Error(error.message)
    }
}