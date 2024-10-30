import { Router } from "express";

import {
  createJobPostulationCtrl,
  getPostulationsCtrl,
} from "./jobPostulationControllers.js";
import { isToken } from "../../../../middlewares/jwt/isVerifiedAccount.js";
import { isStudent } from "../../../../middlewares/jwt/isStudent.js";

const jobPostulationRoutes = Router();

jobPostulationRoutes.post(
  "/create-job-postulation",
  isToken,
  isStudent,
  createJobPostulationCtrl
);

jobPostulationRoutes.get("/postulations/:jobId", getPostulationsCtrl);

export default jobPostulationRoutes;
