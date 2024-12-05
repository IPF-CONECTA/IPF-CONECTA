import { JobPostulation } from "./jobPostulationModel.js";
import { Profile } from "../../../profile/profileModel.js";
import { User } from "../../../users/userModel.js";
import { Job } from "../jobModel.js";

export const createJobPostulationSvc = async (profId, jobId) => {
  try {
    const profile = await Profile.findByPk(profId);
    const profileId = profile.id;

    const job = await Job.findByPk(jobId);
    if (job.active === false)
      throw new Error("El trabajo ya no acepta postulaciones");

    const exists = await JobPostulation.findOne({
      where: { profileId, jobId },
    });
    if (exists) throw new Error("Ya te has postulado para este trabajo");

    const jobPostulation = await JobPostulation.create({ profileId, jobId });
    return jobPostulation;
  } catch (error) {
    throw error;
  }
};

export const getJobPostulationsSvc = async (jobId) => {
  try {
    console.log('SE EJECUTO ACA==============')
    const postulations = await Job.findByPk(jobId, {
      attributes: ["title"],
      include: [
        {
          model: JobPostulation,
          separate: true,
          as: "postulate",
          order: [["favorite", "DESC"]],
          include: [
            {
              model: Profile,
              attributes: ["names", "surnames", "title", "profilePic"],
              include: [
                {
                  model: User,
                  attributes: ["username"],
                },
              ],
            },
          ],
        },
      ],
    });
    console.log(postulations.postulate)
    return postulations
  } catch (error) {
    throw error;
  }
};

export const changeJobPostulationStatusSvc = async (id) => {
  try {
    const jobPostulation = await JobPostulation.findByPk(id);
    jobPostulation.favorite = !jobPostulation.favorite;
    await jobPostulation.save();
    return jobPostulation;
  } catch (error) {
    throw error;
  }
};
