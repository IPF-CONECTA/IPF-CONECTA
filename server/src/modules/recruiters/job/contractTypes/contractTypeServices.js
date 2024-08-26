import { ContractType } from "./contractTypeModel.js"

export const getContractTypesSvc = async () => {
    try {
        return await ContractType.findAll()
    } catch (error) {
        throw new Error(error.message)
    }
}