import { Company } from "../companies/companyModel.js"
import { Job } from "./jobModel.js"

export const createNewJobSvc = async (jobOffer, userId) => {
    try {
        const { companyId: id } = jobOffer
        console.log(id, userId)
        const isCompany = await Company.findByPk(id)
        if (!isCompany) throw new Error('La empresa seleccionada no existe')
        const newJob = await Job.create({
            companyId: id,
            userId: userId,
            title: jobOffer.title,
            description: jobOffer.description,
            locationId: jobOffer.locationId,
            contractTypeId: jobOffer.contractTypeId
        }, { returning: true })
        if (!newJob) throw new Error('Hubo un error al publicar el trabajo')
        return newJob
    } catch (error) {
        throw new Error(error.message)
    }
}