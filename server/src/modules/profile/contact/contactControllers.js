import { getPrefixesSvc } from "./contactServices.js"

export const getPrefixesCtrl = async (_req, res) => {
    try {
        res.status(200).json(await getPrefixesSvc())
    } catch (error) {
        console.log(error)
        res.status(500).json()
    }
}