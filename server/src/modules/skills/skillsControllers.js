import { findSkillSvc } from "./skillsServices.js"

export const findSkillsCtrl = async (req, res) => {
    const { query } = req.query
    try {
        const results = await findSkillSvc(query)
        if (results.length < 1) return res.status(404).json({ message: 'No se encontraron coincidencias' })
        res.status(200).json(results)
    } catch (error) {
        res.status(500).json(error.message)
    }
}