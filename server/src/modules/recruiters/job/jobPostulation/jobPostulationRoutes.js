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
  "/postulation",
  isToken,
  isStudent,
  createJobPostulationCtrl
);
jobPostulationRoutes.get("/postulation/:jobId", isToken, getPostulationsCtrl);
jobPostulationRoutes.put(
  "/postulation/toggle-favorite/:id",
  isToken,
  changeJobPostulationStatusCtrl
);

export default jobPostulationRoutes;
