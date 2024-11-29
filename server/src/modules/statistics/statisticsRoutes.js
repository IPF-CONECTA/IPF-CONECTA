import { Router } from "express";
import {
  skillsTrendCtrl,
  recruitedUsersCtrl,
  getNewUsersCtrl,
  getPostsByMonthCtrl,
  getActiveJobsCtrl,
  recruitedUsersByMonthCtrl,
  getPostsCtrl,
} from "./statisticsController.js";

export const statisticsRoutes = Router();

statisticsRoutes.get("/skills-trend", skillsTrendCtrl);
statisticsRoutes.get("/recruited-users", recruitedUsersCtrl);
statisticsRoutes.get("/recruited-users-by-month", recruitedUsersByMonthCtrl);
statisticsRoutes.get("/users-by-month", getNewUsersCtrl);
statisticsRoutes.get("/posts-by-month", getPostsByMonthCtrl);
statisticsRoutes.get("/posts", getPostsCtrl);
statisticsRoutes.get("/active-jobs", getActiveJobsCtrl);

export default statisticsRoutes;
