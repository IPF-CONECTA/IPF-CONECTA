import { Router } from "express";
import {
  skillsTrendCtrl,
  jobsObteniedCtrl,
  getNewUsersCtrl,
  getPostsByMonthCtrl,
  getActiveJobsCtrl,
} from "./statisticsController.js";

export const statisticsRoutes = Router();

statisticsRoutes.get("/skills-trend", skillsTrendCtrl);
statisticsRoutes.get("/jobs-obtained", jobsObteniedCtrl);
statisticsRoutes.get("/new-users", getNewUsersCtrl);
statisticsRoutes.get("/posts-by-month", getPostsByMonthCtrl);
statisticsRoutes.get("/active-jobs", getActiveJobsCtrl);

export default statisticsRoutes;
