import { createNewJobSvc, findJobsSvc, getJobByIdSvc, getJobsSvc } from "./jobServices.js"
import { addJobSkillSvc } from "./jobSkills/jobSkillServices.js"
import jwt from 'jsonwebtoken'

export const createNewJobCtrl = async (req, res) => {
    let token = req.headers.authorization
    token = token.split(' ')[1]
    console.log('Token extraído:', token);
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
    const pageAsNumber = Number.parseInt(req.query.page)
    let page = 1
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) {
        page = pageAsNumber
    }
    console.log(page)
    let { query } = req.query
    if (!query) {
        query = ''
    }
    try {
        const jobs = await findJobsSvc(query, page - 1)
        console.log(jobs.rows);
        // console.log(jobs, " jobs dedsde el controlador")
        if (jobs.length == 0) return res.status(404).json({ message: 'No se encontraron trabajos para tu busqueda' })
        res.status(200).json({ jobs: jobs.jobsWithUbication, totalPages: Math.ceil(jobs.count / 6), total: jobs.count })

    } catch (error) {
        res.status(500).json(error.message)
    }
}