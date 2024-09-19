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

export const getAllProjectsSvc = async () => {
  try {
    const allProjects = await Project.findAll();
    return allProjects;
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

export const updateProjectSvc = async (projectId, projectData) => {
  try {
    const project = await Project.findByPk(projectId);
    if (!project) throw new Error("Project not found");

    await project.update(projectData);
    //await project.save();

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
