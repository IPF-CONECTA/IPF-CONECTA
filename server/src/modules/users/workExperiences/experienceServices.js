import { WorkExperience } from "./experiencesModel.js";

export const getExperiencesSvc = async (profileId) => {
  try {
    const experiences = await WorkExperience.findAll({
      where: {
        profileId,
      },
    });
    return experiences
  } catch (error) {
    console.log(error)
    throw error;
  }
};
