import { createNewJobSvc, findJobsSvc, getJobByIdSvc, getJobsSvc } from "./jobServices.js"
import { addJobSkillSvc } from "./jobSkills/jobSkillServices.js"
import jwt from 'jsonwebtoken'

export const createNewJobCtrl = async (req, res) => {
    const { token } = req.headers
    const { userId } = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
    const { jobOffer, skills } = req.body

    try {
        const newJob = await createNewJobSvc(jobOffer, userId)
        const jobId = newJob.id
        for (let i = 0; i < skills.length; i++) {
            await addJobSkillSvc(jobId, skills[i])
        }
        res.status(201).json(newJob)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getJobsCtrl = async (req, res) => {
    try {
        const jobs = await getJobsSvc()
        if (jobs.length == 0) return res.status(404).json({ message: 'No se encontraron trabajos disponibles' })
        res.status(200).json(jobs)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const getJobByIdCtrl = async (req, res) => {
    const { id } = req.params
    try {
        if (!id) throw new Error('No se selecciono ninguna oferta')

        const job = await getJobByIdSvc(id)
        if (!job) return res.status(404).json({ message: 'No se encontro la oferta seleccionada' })

        res.status(200).json(job)

    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const findJobsCtrl = async (req, res) => {
    const { query } = req.params
    if (!query) {
        query = ''
    }
    try {
        const jobs = await findJobsSvc(query)
        if (jobs.length == 0) return res.status(404).json({ message: 'No se encontraron trabajos para tu busqueda' })

        res.status(200).json(jobs)
    } catch (error) {
        res.status(500).json(error.message)
    }
}