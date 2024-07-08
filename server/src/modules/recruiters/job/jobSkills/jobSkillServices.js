import { Skill } from "../../../skills/skillsModel.js";
import { Job } from "../jobModel.js";
import { JobSkills } from "./jobSkillsModel.js";

export const addJobSkillSvc = async (jobId, skillId) => {
    try {
        if (!skillId) throw new Error('Ingrese la/s aptitud/es del trabajo')
        const isValidJob = await Job.findByPk(jobId)

        if (!isValidJob) throw new Error('Error interno en el servidor intente de nuevo mas tarde')
        const isValidSkill = await Skill.findByPk(skillId)
        if (!isValidSkill) throw new Error('Ingrese una aptitud correcta')
        await JobSkills.create({
            jobId: jobId,
            skillId: skillId
        })
    } catch (error) {
        throw new Error(error.message)
    }
}