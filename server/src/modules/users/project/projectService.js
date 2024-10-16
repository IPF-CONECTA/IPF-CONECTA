import { Op } from "sequelize";
import { Project } from "./projectModel.js";
import { getAttachmentsSvc } from "../../attachment/attachmentServices.js";
import { ProjectSkills } from "./projectSkillsModel.js";
import { sequelize } from "../../../config/db.js";

export const createProjectSvc = async (projectData, profileId) => {
  console.log(projectData)
  const t = await sequelize.transaction();
  try {
    const newProject = await Project.create({
      ...projectData,
      profileId,
    }, { transaction: t });
    if (projectData.skills.length > 1) {
      await Promise.all(projectData.skills.map(async (skillId) => {
        await ProjectSkills.create({
          projectId: newProject.id,
          skillId,
        }, { transaction: t });
      }));
    } else if (projectData.skills.length === 1) {
      await ProjectSkills.create({
        projectId: newProject.id,
        skillId: projectData.skills[0],
      }, { transaction: t });
    }

    await t.commit();
    return newProject;
  } catch (error) {
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
      attributes: ["id", "name", "description", "startDate", "endDate", "projectLink", "projectLogo", "private"],
      include: [
        {
          model: ProjectSkills,
          attributes: ["skillId"],
          include: {
            association: "skill",
            attributes: ["name"],
          },
        }
      ]
    });

    projects = await Promise.all(projects.map(async (project) => {
      const attachments = await getAttachmentsSvc(project.id);
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
    project.dataValues.attachments = attachments;
    return project;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProjectsByProfileIdSvc = async (profileId) => {
  try {
    const projects = await Project.findAll({
      where: {
        profileId,
      },
    });
    return projects;
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
