import { Op } from "sequelize";
import { Project } from "./projectModel.js";

export const createProjectSvc = async (projectData, profileId) => {
  try {
    const newProject = await Project.create({
      ...projectData,
      profileId,
    });
    return newProject;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProjectsSvc = async (id, reqId) => {
  try {
    const projects = await Project.findAll({
      where: {
        profileId: id,
        [Op.or]: reqId === id ? [{ private: false }, { private: true }] : [{ private: false }],
      },
      attributes: ["id", "name", "smallDescription", "startDate", "endDate", "projectLink", "projectLogo", "private"],
    });
    return projects;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProjectByIdSvc = async (projectId) => {
  try {
    const project = await Project.findByPk(projectId);
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
