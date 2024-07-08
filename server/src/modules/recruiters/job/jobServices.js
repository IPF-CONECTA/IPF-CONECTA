import { Op } from "sequelize"
import { Skill } from "../../skills/skillsModel.js"
import { User } from "../../users/userModel.js"
import { Company } from "../companies/companyModel.js"
import { Job } from "./jobModel.js"
import { JobSkills } from "./jobSkills/jobSkillsModel.js"

export const createNewJobSvc = async (jobOffer, userId) => {
    try {
        const { companyId: id } = jobOffer
        const isCompany = await Company.findByPk(id)
        if (!isCompany) throw new Error('La empresa seleccionada no existe')
        const newJob = await Job.create({
            companyId: id,
            userId: userId,
            title: jobOffer.title,
            modalityId: jobOffer.modalityId,
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

export const getJobsSvc = async () => {
    try {
        const jobs = await Job.findAll({
            where: {
                active: 'true'
            },
            attributes: ['id', 'title', 'locationId', 'modalityId', 'contractTypeId', 'companyId'],
            include: [{
                model: Company,
                attributes: ['name']
            }]
        })
        return jobs
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getJobByIdSvc = async (id) => {
    try {
        const job = await Job.findByPk(id, {
            attributes: { exclude: ['active', 'companyId', 'userId', 'updatedAt'] },
            include: [{
                model: Company,
                attributes: { exclude: ['status', 'justification'] }
            }, {
                model: User,
                attributes: ['id', 'profilePic', 'names', 'surnames']
            },
            {
                model: JobSkills,
                attributes: ['skillId'],
                include: [{
                    model: Skill,
                    attributes: ['name']
                }]
            }
            ]
        })
        return job
    } catch (error) {
        throw new Error(error.message)
    }
}

export const findJobsSvc = async (query) => {
    try {
        let jobs = await Job.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.iLike]: `%${query}%` } }
                ]
            },
            attributes: ['id', 'title', 'locationId', 'modalityId', 'contractTypeId', 'companyId'],
            include: [{
                model: Company,
                attributes: ['name']
            }],
        });
        return jobs;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}