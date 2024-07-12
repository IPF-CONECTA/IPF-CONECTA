import { findUbicationSvc } from "./ubicationServices.js"

export const findUbicationCtrl = async (req, res) => {
    const { query } = req.params
    try {
        const results = await findUbicationSvc(query)
        if (results.length < 1) throw new Error('No se encontraron coincidencias')

        res.status(200).json(results)
    } catch (error) {
        res.status(500).json(error.message)
    }
}