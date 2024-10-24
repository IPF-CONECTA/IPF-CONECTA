import { Op } from "sequelize";
import { Skill } from "../../skills/skillsModel.js";
import { User } from "../../users/userModel.js";
import { Company } from "../companies/companyModel.js";
import { Job } from "./jobModel.js";
import { JobSkills } from "./jobSkills/jobSkillsModel.js";
import { ContractType } from "./contractTypes/contractTypeModel.js";
import { Modality } from "./jobModalities/modalityModel.js";
import { CompanyIndustry } from "../companies/companyIndustry/companyIndustryModel.js";
import { Profile } from "../../profile/profileModel.js";
import { JobPostulation } from "./jobPostulation/jobPostulationModel.js";
import { CompanyLocation } from "../companies/companyLocation/companyLocationModel.js";
import { Country } from "../../locations/models/countryModel.js";
import { City } from "../../locations/models/cityModel.js";
import { State } from "../../locations/models/stateModel.js";
import { createSkillables, getSkillables } from "../../skills/skillable/skillableServices.js";
import { sequelize } from "../../../config/db.js";
import { getLocationByIdSvc } from "../../locations/locationServices.js";

export const createNewJobSvc = async (jobData, profileId) => {
  const t = await sequelize.transaction()
  try {
    const isCompany = await Company.findByPk(jobData.companyId);
    if (!isCompany) throw new Error("La empresa seleccionada no existe");
    const newJob = await Job.create(
      {
        locationableId: jobData.location.value,
        locationableType: jobData.location.type,
        companyId: jobData.companyId,
        profileId: profileId,
        title: jobData.title,
        modalityId: jobData.modalityId,
        description: jobData.description,
        contractTypeId: jobData.contractTypeId,
        applicationLink: jobData.applicationLink,
      },
      { returning: true, transaction: t }
    );
    if (!newJob) throw new Error("Hubo un error al publicar el trabajo");

    if (jobData.skills.length > 0) {
      await createSkillables(newJob.id, jobData.skills, "job", t);
    }
    console.log(newJob)
    await t.commit()
    return newJob;
  } catch (error) {
    await t.rollback()
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
        "applicationLink",
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

    return jobs;
  } catch (error) {
    throw new Error(error);
  }
};

export const getJobByIdSvc = async (id, profileId) => {
  try {
    const job = await Job.findByPk(id, {
      attributes: { exclude: ["active", "companyId", "profileId", "updatedAt"] },
      include: [
        {
          model: Company,
          attributes: { exclude: ["status", "justification"] },
          include: [
            {
              model: CompanyIndustry,
              attributes: ["name"],
            },
          ]
        },
        {
          model: Profile,
          attributes: ["id", "profilePic", "names", "surnames"],
          include: [{
            model: User,
            attributes: ["username"]
          }]
        },

        {
          model: ContractType,
          attributes: ["name"],
        },
        {
          model: Modality,
          attributes: ["name"],
        },],
    })
    job.dataValues.location = await getLocationByIdSvc(job.locationableId, job.locationableType)
    job.dataValues.skills = await getSkillables(job.id)
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

export const getJobsByUsernameSvc = async (username) => {
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

    await Promise.all(jobs.map(async job => {
      job.dataValues.location = await getLocationByIdSvc(job.locationableId, job.locationableType)
      job.dataValues.skills = await getSkillables(job.id)
    }))
    console.log(jobs)
    return jobs;
  } catch (error) {
    console.log(error)
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
