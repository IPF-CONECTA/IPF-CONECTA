import { getModalitiesSvc } from "./modalityService.js"

export const getModalitiesCtrl = async (req, res) => {
    try {
        const modalities = await getModalitiesSvc()
        if (modalities.length == 0) return res.status(404).json()

        res.status(200).json(modalities)
    } catch (error) {
        res.status(500).json(error.message)
    }
}