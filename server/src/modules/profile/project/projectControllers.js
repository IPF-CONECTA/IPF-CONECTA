import { getProfileIdByUsername } from "../../users/userServices.js";
import {
  createProjectSvc,
  getProjectByIdSvc,
  updateProjectSvc,
  deleteProjectSvc,
  getProjectsSvc,
} from "./projectService.js";

export const createProjectCtrl = async (req, res) => {
  try {
    const { id } = req.user.profile;
    const { project } = req.body;
    if (!project) return res.status(400).json({ message: "Faltan datos por completar" });
    const newProject = await createProjectSvc(project, id, req.files && req.files.length > 0 && req.files);
    res.status(201).json(newProject);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};

export const getProjectsCtrl = async (req, res) => {
  const { username } = req.params;
  const reqId = req.user.profile.id
  try {
    const profileId = await getProfileIdByUsername(username)
    const allProjects = await getProjectsSvc(profileId, reqId);
    res.status(200).json(allProjects);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};

export const getProjectByIdCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await getProjectByIdSvc(id);

    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateProjectCtrl = async (req, res) => {
  try {
    const { id: profileId } = req.user.profile;
    const { id } = req.params;
    const { project } = req.body;

    const updatedProject = await updateProjectSvc(id, project, profileId);
    if (!updatedProject)
      return res.status(404).json({ message: "Project not found" });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProjectCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await deleteProjectSvc(id);

    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
