import { sequelize } from "../../../config/db.js";
import { getAttachmentsSvc } from "../../attachment/attachmentServices.js";
import { Company } from "../../recruiters/companies/companyModel.js";
import { Modality } from "../../recruiters/job/jobModalities/modalityModel.js";
import { Skill } from "../../skills/skillsModel.js";
import { City } from "../../ubications/models/cityModel.js";
import { Country } from "../../ubications/models/countryModel.js";
import { State } from "../../ubications/models/stateModel.js";
import { ExperienceSkill } from "./experienceSkillModel.js";
import { Experience } from "./experiencesModel.js";

export const getExperiencesSvc = async (profileId) => {
  try {
    let experiences = await Experience.findAll({
      where: {
        profileId,
      },
      include: [
        {
          model: ExperienceSkill,
          attributes: ["skillId"],
          include: [{
            model: Skill,
            attributes: ["name"]
          }]
        },
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
      const attachments = await getAttachmentsSvc(experience.id);
      experience.dataValues.attachments = attachments;
      return experience;
    }));

    const formattedExperiences = experiences.map(exp => {
      let ubication = '';
      if (exp.city) {
        ubication = `${exp.city.name}, ${exp.city.state ? exp.city.state.name + ', ' : ''}${exp.city.state.country.name}`;
      } else if (exp.state) {
        ubication = `${exp.state.name}, ${exp.state.country.name}`;
      } else if (exp.country) {
        ubication = `${exp.country.name}`;
      }
      return {
        ...exp.toJSON(),
        ubication
      };
    });

    return formattedExperiences;
  } catch (error) {
    console.log(error)
    throw error;
  }
};


export const createExperienceSvc = async (experience, profileId) => {
  console.log(experience)
  const t = await sequelize.transaction()
  try {

    const newExperience = await Experience.create({
      title: experience.title,
      contractTypeId: experience.contractTypeId,
      companyId: experience.companyId,
      ubicationId: experience.ubicationId,
      ubicationType: experience.ubicationType,
      modalityId: experience.modalityId,
      startDate: experience.startDate,
      endDate: experience.endDate !== "null" ? experience.endDate : null,
      description: experience.description,
      profileId,
    }, { transaction: t })

    experience.skills && (await Promise.all(experience.skills.map(async skill => (
      await ExperienceSkill.create({
        experienceId: newExperience.id,
        skillId: skill
      }, { transaction: t })
    ))))
    await t.commit()
    return newExperience;
  } catch (error) {
    await t.rollback()
    throw new Error(error.message)
  }
}