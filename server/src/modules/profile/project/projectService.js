import { Op } from "sequelize";
import { Project } from "./projectModel.js";
import { createAttachmentsSvc, getAttachmentsSvc } from "../../attachment/attachmentServices.js";
import { ProjectSkills } from "./projectSkillsModel.js";
import { sequelize } from "../../../config/db.js";
import { createSkillables, getSkillables } from "../../skills/skillable/skillableServices.js";

export const createProjectSvc = async (projectData, profileId, files) => {
  const t = await sequelize.transaction();
  try {
    const newProject = await Project.create({
      ...projectData,
      profileId,
    }, { transaction: t });

    if (!newProject) throw new Error({ message: "Hubo un error al crear el proyecto" })
    await createSkillables(newProject.id, projectData.skills, "project", t)
    await createAttachmentsSvc(newProject.id, files, "project", t)

    await t.commit();
    return newProject;
  } catch (error) {
    console.log(error)
    await t.rollback();
    throw new Error(error.message);
  }
};

export const getProjectsSvc = async (id, reqId) => {
  try {
    let projects = await Project.findAll({
      where: {
        profileId: id,
        [Op.or]: reqId === id ? [{ private: false }, { private: true }] : [{ private: false }],
      },
      attributes: ["id", "name", "description", "startDate", "endDate", "projectLink", "private"],
    });

    projects = await Promise.all(projects.map(async (project) => {
      const skills = await getSkillables(project.id)
      const attachments = await getAttachmentsSvc(project.id);
      project.dataValues.skills = skills
      project.dataValues.attachments = attachments;
      return project;
    }));
    return projects
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProjectByIdSvc = async (projectId) => {
  try {
    const project = await Project.findByPk(projectId);
    const attachments = await getAttachmentsSvc(project.id)
    const skills = await getSkillables(project.id)
    project.dataValues.skills = skills
    project.dataValues.attachments = attachments;
    return project;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getProjectInfoByIdSvc = async (projectId) => {
  try {
    const project = await Project.findByPk(projectId, {
      attributes: ["name"]
    });
    return project;
  } catch (error) {
    throw new Error(error.message);
  }
};



export const updateProjectSvc = async (projectId, projectData, profileId) => {
  try {
    const project = await Project.findByPk(projectId);
    if (!project) throw new Error("Project not found");

    if (project.profileId !== profileId) {
      throw new Error("Unauthorized: You can only edit your own projects");
    }

    await project.update(projectData);

    return project;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteProjectSvc = async (projectId) => {
  try {
    const project = await Project.findByPk(projectId);
    if (!project) throw new Error("Project not found");

    await project.destroy();
    return project;
  } catch (error) {
    throw new Error(error.message);
  }
};
