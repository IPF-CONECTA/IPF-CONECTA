import {
  createProjectSvc,
  getAllProjectsSvc,
  getProjectByIdSvc,
  getProjectsByProfileIdSvc,
  updateProjectSvc,
  deleteProjectSvc,
} from "./projectService.js";

export const createProjectCtrl = async (req, res) => {
  try {
    const { id } = req.user.profile;

    const newProject = await createProjectSvc(req.body, id);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProjectsCtrl = async (req, res) => {
  try {
    const allProjects = await getAllProjectsSvc();
    res.status(200).json(allProjects);
  } catch (error) {
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

export const getProfileProjectsCtrl = async (req, res) => {
  try {
    const { id } = req.user.profile;
    const projects = await getProjectsByProfileIdSvc(id);
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProjectCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await updateProjectSvc(id, req.body);

    if (!project) return res.status(404).json({ message: "Project not found" });
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
