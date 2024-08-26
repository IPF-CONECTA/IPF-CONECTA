import { getContractTypesSvc } from "./contractTypeServices.js"

export const getContractTypesCtrl = async (req, res) => {
    try {
        const contractTypes = await getContractTypesSvc()
        if (contractTypes.length == 0) return res.status(404).json()

        res.status(200).json(contractTypes)
    } catch (error) {
        res.status(500).json(error.message)
    }
}