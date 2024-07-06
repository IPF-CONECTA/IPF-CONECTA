import { Association } from "./associationModel.js";
import { createCompany } from "../companies/companyServices.js";

// export const createAssociation = async (userId, companyId) => {
//     try {
//         const verification = await Verification.create({ userId, companyId })
//         return verification
//     } catch (error) {
//         throw new Error(error.message)
//     }
// }

export const associateNewCompanySvc = async (message, userId, company) => {
    try {
        console.log('NESSU')
        const newCompany = await createCompany(company)
        console.log('newCompany', newCompany)
        const association = await Association.create({ userId, companyId: newCompany.id, message })
        console.log('association', association)
        return association
    } catch (error) {
        throw new Error(error.message)
    }
}
