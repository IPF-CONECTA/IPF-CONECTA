import { Router } from "express";
import { getIndustriesCtrl } from "./companyIndustryController.js";

const companyIndustriesRoutes = Router();

companyIndustriesRoutes.get("/industries", getIndustriesCtrl);

export default companyIndustriesRoutes