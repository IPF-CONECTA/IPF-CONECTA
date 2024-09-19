import { Router } from "express";
import {
  createProjectCtrl,
  deleteProjectCtrl,
  getAllProjectsCtrl,
  getProfileProjectsCtrl,
  getProjectByIdCtrl,
  updateProjectCtrl,
} from "./projectControllers.js";

import { isToken } from "../../../middlewares/jwt/isVerifiedAccount.js";
import { createProjectSchema, updateProjectSchema } from "./projectSchema.js";
import { validateSchema } from "../../../middlewares/expressValidator.js";

const projectRoutes = Router();

projectRoutes.post(
  "/create",
  isToken,
  createProjectSchema,
  validateSchema,
  createProjectCtrl
);
projectRoutes.get("/all", isToken, getAllProjectsCtrl);
projectRoutes.get("/profile", isToken, getProfileProjectsCtrl);
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
