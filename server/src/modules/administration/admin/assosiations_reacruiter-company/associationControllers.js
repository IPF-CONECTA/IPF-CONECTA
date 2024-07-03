import { getAssociationById, getAssociations, updateAssociation } from "./assosiationServices.js"

export const getAllAssociations = async (req, res) => {
    try {
        const associations = await getAssociations()
        if (associations.length == 0) res.status(404).json({ message: 'No hay verificaciones pendientes' })
        res.status(200).json({ associations })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getAssociationByIdCtrl = async (req, res) => {
    try {
        const { id } = req.params;
        const association = await getAssociationById(id)
        if (!association) {
            res.status(404).json({ message: 'No se encontro la asociacion' })
        }
        res.status(200).json(association)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const updateAssociationCtrl = async (req, res) => {
    try {
        let { id, status } = req.params;
        if (!id || !status) throw new Error('Query erronea');
        if (status !== 'Aprobada' && status !== 'Rechazada') throw new Error('Estado inválido');
        await updateAssociation(id, status);
        status = status.toLowerCase()
        res.status(201).json({ message: `Asociacion ${status} con exito` })
    } catch (error) {
        res.status(500).json(error.message)
    }
}