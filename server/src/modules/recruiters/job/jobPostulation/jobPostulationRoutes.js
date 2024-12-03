import { Router } from "express";

import {
  createJobPostulationCtrl,
  getPostulationsCtrl,
  changeJobPostulationStatusCtrl,
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
jobPostulationRoutes.get("/postulations/:jobId", isToken, getPostulationsCtrl);
jobPostulationRoutes.put(
  "/change-job-postulation-status/:id",
  isToken,
  changeJobPostulationStatusCtrl
);

export default jobPostulationRoutes;
