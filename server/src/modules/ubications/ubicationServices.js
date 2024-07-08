import { Op } from "sequelize"
import { City } from "./models/cityModel.js"
import { State } from "./models/stateModel.js"
import { Country } from "./models/countryModel.js"

export const findUbicationSvc = async (query) => {
    try {
        const cities = await City.findAll({
            where:
            {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } }
                ]
            },
            attributes: { exclude: ['stateId'] },
            include: [{
                model: State,
                attributes: ['name'],
                include: [{
                    model: Country,
                    attributes: ['name']
                }]
            }]
        })
        const states = await State.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } }
                ]
            },
            include: [{
                model: Country,
                attributes: ['name']
            }],
        })

        return [cities, states]

    } catch (error) {
        throw new Error(error.message)
    }
}