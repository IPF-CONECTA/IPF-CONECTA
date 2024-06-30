import { getAssociations } from "./assosiationServices.js"

export const getAllAssociations = async (req, res) => {
    try {
        const associations = await getAssociations()
        if (associations.length == 0) res.status(404).json({ message: 'No hay verificaciones pendientes' })
        res.status(200).json({ associations })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getAssociationByIdCtrl = async (req, res) => { }