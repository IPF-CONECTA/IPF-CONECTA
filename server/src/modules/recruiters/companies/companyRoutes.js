import { Router } from "express";
import { sendContactCompanyCtrl } from "./companyControllers.js";

const companyRoutes = Router();

companyRoutes.post('/contact', sendContactCompanyCtrl)

export default companyRoutes;