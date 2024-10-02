import { Router } from "express";
import {
  createProjectCtrl,
  deleteProjectCtrl,
  getProjectByIdCtrl,
  getProjectsCtrl,
  updateProjectCtrl,
} from "./projectControllers.js";

import { isToken } from "../../../middlewares/jwt/isVerifiedAccount.js";
import { createProjectSchema, updateProjectSchema } from "./projectSchema.js";
import { validateSchema } from "../../../middlewares/expressValidator.js";

const projectRoutes = Router();

projectRoutes.post(
  "/project",
  isToken,
  createProjectSchema,
  validateSchema,
  createProjectCtrl
);
projectRoutes.get("/projects/:username", isToken, getProjectsCtrl);
projectRoutes.get("/project/:id", isToken, getProjectByIdCtrl);
projectRoutes.patch(
  "/project/:id",
  isToken,
  updateProjectSchema,
  validateSchema,
  updateProjectCtrl
);
projectRoutes.delete("/project/:id", isToken, deleteProjectCtrl);

export default projectRoutes;
