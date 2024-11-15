import { Country } from "../../locations/models/countryModel.js"

export const getPrefixesSvc = async () => {
    try {
        const prefixes = await Country.findAll({
            attributes: ["phoneCode", "emoji"],
        })
        return prefixes
    } catch (error) {
        throw error
    }
}