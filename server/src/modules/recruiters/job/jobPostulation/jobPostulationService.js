import { JobPostulation } from "./jobPostulationModel.js";
import { Profile } from "../../../profile/profileModel.js";
import { User } from "../../../users/userModel.js";

export const createJobPostulationSvc = async (profId, jobId) => {
  try {
    const profile = await Profile.findByPk(profId);
    const profileId = profile.id;

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
    const postulations = await JobPostulation.findAll({
      where: { jobId },
      include: {
        model: Profile,
        attributes: ["names", "surnames", "profilePic", "about"],
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      },
    });
    return postulations;
  } catch (error) {
    throw error;
  }
};
