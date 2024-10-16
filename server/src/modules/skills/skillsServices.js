import { Op } from "sequelize"
import { Skill } from "./skillsModel.js"

export const findSkillSvc = async (query) => {
    try {
        const results = await Skill.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${query}%`
                }
            },
            limit: 50
        })
        return results
    } catch (error) {
        console.error(error)
        throw new Error('Error en la búsqueda de habilidades')
    }
}

export const getSkillByPk = async (id) => {
    try {
        const skill = Skill.findByPk(id)
        if (!skill) throw new Error("No se encontró la skill")
        return skill
    } catch (error) {
        throw error
    }
}