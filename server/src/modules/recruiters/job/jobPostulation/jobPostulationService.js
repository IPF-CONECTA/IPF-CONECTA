import { JobPostulation } from "./jobPostulationModel.js";
import { Profile } from "../../../profile/profileModel.js";

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