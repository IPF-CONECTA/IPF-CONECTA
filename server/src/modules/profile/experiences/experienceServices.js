import { sequelize } from "../../../config/db.js";
import { createAttachmentsSvc, getAttachmentsSvc } from "../../attachment/attachmentServices.js";
import { Company } from "../../recruiters/companies/companyModel.js";
import { Modality } from "../../recruiters/job/jobModalities/modalityModel.js";
import { createSkillables, getSkillables } from "../../skills/skillable/skillableServices.js";
import { City } from "../../locations/models/cityModel.js";
import { Country } from "../../locations/models/countryModel.js";
import { State } from "../../locations/models/stateModel.js";
import { Experience } from "./experiencesModel.js";

export const getExperiencesSvc = async (profileId) => {
  try {
    let experiences = await Experience.findAll({
      where: {
        profileId,
      },
      include: [
        {
          model: Modality,
          attributes: ["name"]
        },
        {
          model: Company,
          attributes: ["id", "logoUrl", "name"],
        },
        {
          model: State,
          as: 'state',
          include: [{
            model: Country
          }]
        },
        {
          model: Country,
          as: 'country',
        },
        {
          model: City,
          as: 'city',
          include: [{
            model: State,
            include: [{
              model: Country
            }]
          }]
        },
      ]
    });

    experiences = await Promise.all(experiences.map(async (experience) => {
      const skills = await getSkillables(experience.id)
      const attachments = await getAttachmentsSvc(experience.id);
      experience.dataValues.attachments = attachments;
      experience.dataValues.skills = skills
      return experience;
    }));

    const formattedExperiences = experiences.map(exp => {
      let location = '';
      if (exp.city) {
        location = `${exp.city.name}, ${exp.city.state ? exp.city.state.name + ', ' : ''}${exp.city.state.country.name}`;
      } else if (exp.state) {
        location = `${exp.state.name}, ${exp.state.country.name}`;
      } else if (exp.country) {
        location = `${exp.country.name}`;
      }
      return {
        ...exp.toJSON(),
        location
      };
    });

    return formattedExperiences;
  } catch (error) {
    console.log(error)
    throw error;
  }
};


export const createExperienceSvc = async (experience, profileId, files) => {
  const t = await sequelize.transaction()
  try {

    const newExperience = await Experience.create({
      title: experience.title,
      contractTypeId: experience.contractTypeId,
      companyId: experience.companyId,
      locationId: experience.locationId,
      locationType: experience.locationType,
      modalityId: experience.modalityId,
      startDate: experience.startDate,
      endDate: experience.endDate !== "null" ? experience.endDate : null,
      description: experience.description,
      profileId,
    }, { transaction: t })
    await createAttachmentsSvc(newExperience.id, files, "experience", t)
    await createSkillables(newExperience.id, experience.skills, "experience", t)

    await t.commit()
    return newExperience;
  } catch (error) {
    await t.rollback()
    throw new Error(error.message)
  }
}


export const updateExperienceSvc = async (experience, profileId) => {
  try {
    const isExistingExperience = await Experience.findByPk(experience.id);
    if (!isExistingExperience) throw new Error("No se encontró la experiencia a actualizar")

  } catch (error) {

  }
}