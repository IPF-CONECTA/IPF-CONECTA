import { Op } from "sequelize"
import { Skill } from "./skillsModel.js"

export const findSkillSvc = async (query) => {
    try {
        const results = await Skill.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${query}%`
                }
            }
        })
        console.log(results)
        return results
    } catch (error) {
        console.error(error)
        throw new Error('Error en la búsqueda de habilidades')
    }
}