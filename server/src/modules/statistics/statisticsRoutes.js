import { Router } from "express";
import {
  skillsTrendCtrl,
  jobsObteniedCtrl,
  getNewUsersCtrl,
  getPostsByMonthCtrl,
} from "./statisticsController.js";

export const statisticsRoutes = Router();

statisticsRoutes.get("/skills-trend", skillsTrendCtrl);
statisticsRoutes.get("/jobs-obtained", jobsObteniedCtrl);
statisticsRoutes.get("/new-users", getNewUsersCtrl);
statisticsRoutes.get("/posts-by-month", getPostsByMonthCtrl);

export default statisticsRoutes;
