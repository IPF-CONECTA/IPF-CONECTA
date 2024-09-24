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
projectRoutes.get("/projects/:profileId", isToken, getProjectsCtrl);
projectRoutes.get("/:id", isToken, getProjectByIdCtrl);
projectRoutes.patch(
  "/:id",
  isToken,
  updateProjectSchema,
  validateSchema,
  updateProjectCtrl
);
projectRoutes.delete("/:id", isToken, deleteProjectCtrl);

export default projectRoutes;
