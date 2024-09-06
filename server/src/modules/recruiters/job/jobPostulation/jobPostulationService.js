import { JobPostulation } from "./jobPostulationModel.js";

export const createJobPostulationSvc = async (profileId, jobId) => {
  try {
    const jobPostulation = await JobPostulation.create({ profileId, jobId });
    return jobPostulation;
  } catch (error) {
    throw error;
  }
};
