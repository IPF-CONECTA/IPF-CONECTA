import { Op } from "sequelize";
import { User } from "../../users/userModel.js";
import { Company } from "../companies/companyModel.js";
import { Job } from "./jobModel.js";
import { ContractType } from "./contractTypes/contractTypeModel.js";
import { Modality } from "./jobModalities/modalityModel.js";
import { CompanyIndustry } from "../companies/companyIndustry/companyIndustryModel.js";
import { Profile } from "../../profile/profileModel.js";
import { JobPostulation } from "./jobPostulation/jobPostulationModel.js";
import {
  createSkillables,
  deleteSkillables,
  getSkillables,
} from "../../skills/skillable/skillableServices.js";
import { sequelize } from "../../../config/db.js";
import { getLocationByIdSvc } from "../../locations/locationServices.js";

export const createNewJobSvc = async (jobData, profileId) => {
  const t = await sequelize.transaction();
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
    await t.commit();
    return newJob;
  } catch (error) {
    await t.rollback();
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
      attributes: {
        exclude: ["active", "companyId", "updatedAt"],
      },
      include: [
        {
          model: Company,
          attributes: { exclude: ["status", "justification"] },
          include: [
            {
              model: CompanyIndustry,
              attributes: ["name"],
            },
          ],
        },
        {
          model: Profile,
          attributes: ["id", "profilePic", "names", "surnames"],
          include: [
            {
              model: User,
              attributes: ["id", "username"],
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
    job.dataValues.location = await getLocationByIdSvc(
      job.locationableId,
      job.locationableType
    );
    job.dataValues.skills = await getSkillables(job.id);

    if (!profileId) return { job, postulated: false };
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
    console.log(error);
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

    await Promise.all(
      jobs.map(async (job) => {
        job.dataValues.location = await getLocationByIdSvc(
          job.locationableId,
          job.locationableType
        );
        job.dataValues.skills = await getSkillables(job.id);
      })
    );
    return jobs;
  } catch (error) {
    console.log(error);
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

export const updateJobSvc = async (jobId, jobData, profileId) => {
  const t = await sequelize.transaction();
  try {
    const job = await Job.findOne({
      where: { id: jobId, profileId: profileId },
    });
    if (!job)
      throw new Error(
        "La oferta de trabajo no existe o no pertenece al perfil especificado"
      );

    const isCompany = await Company.findByPk(jobData.companyId);
    if (!isCompany) throw new Error("La empresa seleccionada no existe");

    const [updated] = await Job.update(
      {
        locationableId: jobData.location.value,
        locationableType: jobData.location.type,
        companyId: jobData.companyId,
        title: jobData.title,
        modalityId: jobData.modalityId,
        description: jobData.description,
        contractTypeId: jobData.contractTypeId,
        applicationLink: jobData.applicationLink,
      },
      { where: { id: jobId }, transaction: t }
    );

    if (!updated) throw new Error("Error al actualizar la oferta de trabajo");

    if (jobData.skills && jobData.skills.length > 0) {
      const skillables = await getSkillables(jobId);
      const existingSkillIds = skillables.map((skill) => skill.id);
      const newSkillIds = jobData.skills.map((skill) => skill);

      const skillsToDelete = existingSkillIds.filter(
        (id) => !newSkillIds.includes(id)
      );
      const skillsToAdd = newSkillIds.filter(
        (id) => !existingSkillIds.includes(id)
      );

      if (skillsToDelete.length > 0) {
        await deleteSkillables(jobId, skillsToDelete, t);
      }

      if (skillsToAdd.length > 0) {
        await createSkillables(jobId, skillsToAdd, "job", t);
      }
    } else {
      await deleteSkillables(jobId, [], t);
    }

    await t.commit();
    return await Job.findByPk(jobId);
  } catch (error) {
    await t.rollback();
    throw new Error(error.message);
  }
};
