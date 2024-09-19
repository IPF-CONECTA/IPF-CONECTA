import { WorkExperience } from "./experiencesModel.js";

export const getExperiencesSvc = async (userRequestId, profileId) => {
  try {
    const experiences = await WorkExperience.findAll({
      where: {
        profileId,
      },
    });
    return { experiences, own: profileId == userRequestId ? true : false };
  } catch (error) {
    throw error;
  }
};
