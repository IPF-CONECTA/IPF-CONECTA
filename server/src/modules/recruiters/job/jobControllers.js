import { createNewJobSvc } from "./jobServices.js"
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