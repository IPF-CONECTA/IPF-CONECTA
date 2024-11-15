import { sequelize } from "../../../config/db.js";
import {
  createSkillables,
  deleteSkillable,
  deleteSkillables,
  getSkillables,
} from "../../skills/skillable/skillableServices.js";
import { Discipline } from "./disciplines/disciplineModel.js";
import { Education } from "./educationModel.js";

export const createEducationSvc = async (profileId, education) => {
  const t = await sequelize.transaction();
  try {
    const newEducation = await Education.create(
      {
        title: education.title,
        instituteId: education.instituteId,
        description: education.description,
        startDate: education.startDate,
        endDate: education.endDate,
        disciplineId: education.disciplineId,
        profileId,
      },
      { transaction: t }
    );
    await createSkillables(newEducation.id, education.skills, "education", t);
    await t.commit();
    return newEducation;
  } catch (error) {
    await t.rollback();
    console.log(error);
  }
};

export const getEducationSvc = async (profileId) => {
  let educations = await Education.findAll({
    where: { profileId },
    include: [
      {
        model: Discipline,
        as: "discipline",
        attributes: ["name"],
      },
    ],
  });

  educations = await Promise.all(
    educations.map(async (education) => {
      const skills = await getSkillables(education.id);
      education.dataValues.skills = skills;
      return education;
    })
  );
  return educations;
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

export const updateEducationSvc = async (educationId, educationData) => {
  const t = await sequelize.transaction();
  try {
    const educationFound = await Education.findOne({
      where: { id: educationId },
    });

    if (educationData.skills && educationData.skills.length > 0) {
      const skillables = await getSkillables(educationId);
      const existingSkillIds = skillables.map((skill) => skill.id);
      const newSkillIds = educationData.skills.map((skill) => skill);

      const skillsToDelete = existingSkillIds.filter(
        (id) => !newSkillIds.includes(id)
      );
      const skillsToAdd = newSkillIds.filter(
        (id) => !existingSkillIds.includes(id)
      );

      if (skillsToDelete.length > 0) {
        await deleteSkillable(educationId, skillsToDelete, t);
      }

      if (skillsToAdd.length > 0) {
        await createSkillables(educationId, skillsToAdd, "education", t);
      }
    } else {
      await deleteSkillables(educationId, [], t);
    }

    const updatedEducation = await educationFound.update(educationData);
    t.commit();
    return updatedEducation;
  } catch (error) {
    t.rollback();
    console.log(error);
  }
};

export const deleteEducationSvc = async (id) => {
  const education = await Education.findOne({ where: { id } });
  if (!education) return null;
  await education.destroy();
  return "Educación eliminada";
};
