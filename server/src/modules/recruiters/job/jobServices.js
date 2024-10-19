import { Op } from "sequelize";
import { Skill } from "../../skills/skillsModel.js";
import { User } from "../../users/userModel.js";
import { Company } from "../companies/companyModel.js";
import { Job } from "./jobModel.js";
import { JobSkills } from "./jobSkills/jobSkillsModel.js";
import {
  getAllLocations,
  getLocation,
  getLocationType,
} from "../../../helpers/getLocationType.js";
import { ContractType } from "./contractTypes/contractTypeModel.js";
import { Modality } from "./jobModalities/modalityModel.js";
import { CompanyIndustry } from "../companies/companyIndustry/companyIndustryModel.js";
import { Profile } from "../../profile/profileModel.js";
import { JobPostulation } from "./jobPostulation/jobPostulationModel.js";
import { CompanyUbication } from "../companies/companyUbication/companyUbicationModel.js";
import { Country } from "../../ubications/models/countryModel.js";
import { City } from "../../ubications/models/cityModel.js";
import { State } from "../../ubications/models/stateModel.js";

export const createNewJobSvc = async (jobOffer, profileId) => {
  try {
    const isCompany = await Company.findByPk(jobOffer.companyId);

    if (!isCompany) throw new Error("La empresa seleccionada no existe");
    const newJob = await Job.create(
      {
        companyId: jobOffer.companyId,
        profileId: profileId,
        title: jobOffer.title,
        modalityId: jobOffer.modalityId,
        description: jobOffer.description,
        contractTypeId: jobOffer.contractTypeId,
        applicationLink: jobOffer.applicationLink,
      },
      { returning: true }
    );
    if (!newJob) throw new Error("Hubo un error al publicar el trabajo");
    return newJob;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getJobsSvc = async () => {
  try {
    const jobs = await Job.findAll({
      where: {
        active: "true",
      },
      attributes: [
        "id",
        "title",
        "modalityId",
        "contractTypeId",
        "companyId",
        "createdAt",
        "aplicationLink",
      ],
      include: [
        {
          model: Company,
          attributes: ["name"],
        },
        {
          model: Modality,
          attributes: ["name"],
        },
        {
          model: ContractType,
          attributes: ["name"],
        },
      ],
    });
    const jobsWithUbication = await getAllLocations(jobs);
    return jobsWithUbication;
  } catch (error) {
    throw new Error(error);
  }
};

export const getJobByIdSvc = async (id, profileId) => {
  try {
    const job = await Job.findByPk(id, {
      attributes: { exclude: ["active", "companyId", "userId", "updatedAt"] },
      include: [
        {
          model: Company,
          attributes: { exclude: ["status", "justification"] },
          include: [
            {
              model: CompanyIndustry,
              attributes: ["name"],
            },
            {
              model: CompanyUbication,
              include: [
                {
                  model: Country,
                },
                {
                  model: State,
                  include: [
                    {
                      model: Country,
                    },
                  ],
                },
                {
                  model: City,
                  include: [
                    {
                      model: State,
                      include: [
                        {
                          model: Country,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },

        {
          model: Profile,
          attributes: ["id", "profilePic", "names", "surnames"],
        },
        {
          model: JobSkills,
          attributes: ["skillId"],
          include: [
            {
              model: Skill,
              attributes: ["name"],
            },
          ],
        },
        {
          model: ContractType,
          attributes: ["name"],
        },
        {
          model: Modality,
          attributes: ["name"],
        },
      ],
    });

    const postulate = await JobPostulation.findOne({
      where: {
        profileId,
        jobId: id,
      },
    });

    return {
      job,
      postulated: postulate ? true : false,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const findJobsSvc = async (query, page) => {
  try {
    let jobs = await Job.findAndCountAll({
      where: {
        [Op.or]: [{ title: { [Op.iLike]: `%${query}%` } }],
      },
      limit: 6,
      offset: page * 6,
      distinct: true,
      attributes: [
        "id",
        "title",
        "modalityId",
        "contractTypeId",
        "companyId",
        "createdAt",
      ],
      include: [
        {
          model: Company,
          attributes: ["name", "logoUrl"],
        },
        {
          model: Modality,
          attributes: ["name"],
        },
        {
          model: ContractType,
          attributes: ["name"],
        },
      ],
    });
    return { data: jobs, count: jobs.count };
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const findJobsByUsernameSvc = async (username) => {
  try {
    const recruiter = await User.findOne({
      where: { username },
    });

    const profile = await Profile.findOne({
      where: { userId: recruiter.id },
    });

    const jobs = await Job.findAll({
      where: { profileId: profile.id },
      include: { model: Company, attributes: ["name", "logoUrl"] },
    });

    return jobs;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteJobSvc = async (id) => {
  try {
    await Job.destroy({
      where: { id },
    });
  } catch (error) {
    throw new Error(error);
  }
};
