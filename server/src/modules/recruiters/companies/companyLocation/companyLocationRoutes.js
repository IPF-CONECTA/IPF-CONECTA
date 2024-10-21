import { Router } from "express";
import { createCompanyLocationCtrl } from "./companyLocationControllers.js";

const companyLocationRoutes = Router();

companyLocationRoutes.post(
  "/create-company-location",
  createCompanyLocationCtrl
);

export default companyLocationRoutes;
