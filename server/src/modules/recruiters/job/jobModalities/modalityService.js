import { Modality } from "./modalityModel.js"

export const getModalitiesSvc = async () => {
    try {
        return await Modality.findAll()
    } catch (error) {
        throw new Error(error.message)
    }
}