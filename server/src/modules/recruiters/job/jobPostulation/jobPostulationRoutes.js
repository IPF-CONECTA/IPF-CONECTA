import { Router } from "express";

import { createJobPostulationCtrl } from "./jobPostulationControllers.js";
import { isToken } from "../../../../middlewares/jwt/isVerifiedAccount.js";

const jobPostulationRoutes = Router();

jobPostulationRoutes.post(
  "/create-job-postulation",
  isToken,
  createJobPostulationCtrl
);

export default jobPostulationRoutes;
