import { Router } from "express";

import { createJobPostulationCtrl } from "./jobPostulationControllers.js";
import { isToken } from "../../../../middlewares/jwt/isVerifiedAccount.js";
import { isStudent } from "../../../../middlewares/jwt/isStudent.js";

const jobPostulationRoutes = Router();

jobPostulationRoutes.post(
  "/create-job-postulation",
  isToken,
  isStudent,
  createJobPostulationCtrl
);

export default jobPostulationRoutes;
