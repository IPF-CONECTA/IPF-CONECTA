import { Router } from "express";

import { createJobPostulationCtrl } from "./jobPostulationControllers.js";

const jobPostulationRoutes = Router();

jobPostulationRoutes.post("/create-job-postulation", createJobPostulationCtrl);

export default jobPostulationRoutes;
