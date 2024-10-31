import { Discipline } from "./disciplines/disciplineModel.js";
import { Education } from "./educationModel.js";

export const createEducationSvc = async (profileId, education) => {
  try {
    const newEducation = await Education.create({
      profileId,
      ...education,
      disciplineId: education.disciplineId,
    });
    if (!newEducation) return null;
    return newEducation;
  } catch (error) {
    console.log(error);
  }
};

export const getEducationSvc = async (profileId) => {
  return await Education.findAll({
    where: { profileId },
    include: [
      {
        model: Discipline,
        as: "discipline",
        attributes: ["name"],
      },
    ],
  });
};

export const getEducationByIdSvc = async (id) => {
  const education = await Education.findOne({
    where: { id },
    include: [
      {
        model: Discipline,
        as: "discipline",
        attributes: ["name"],
      },
    ],
  });
  return education;
};

export const updateEducationSvc = async (id, education) => {
  const educationFound = await Education.findOne({ where: { id } });
  if (!educationFound) return null;

  const updatedEducation = await educationFound.update(education);
  console.log(updatedEducation);
  return updatedEducation;
};

export const deleteEducationSvc = async (id) => {
  const education = await Education.findOne({ where: { id } });
  if (!education) return null;
  await education.destroy();
  return "Educación eliminada";
};
