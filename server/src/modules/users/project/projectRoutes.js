import { Router } from "express";
import {
  createProjectCtrl,
  deleteProjectCtrl,
  getAllProjectsCtrl,
  getProfileProjectsCtrl,
  getProjectByIdCtrl,
  updateProjectCtrl,
} from "./projectControllers.js";

const projectRoutes = Router();

projectRoutes.post("/create", createProjectCtrl);
projectRoutes.get("/all", getAllProjectsCtrl);
projectRoutes.get("/profile", getProfileProjectsCtrl);
projectRoutes.get("/:id", getProjectByIdCtrl);
projectRoutes.patch("/:id", updateProjectCtrl);
projectRoutes.delete("/:id", deleteProjectCtrl);

export default projectRoutes;
