import { Router } from "express";
import { createCtrl } from "./companyUbicationControllers.js";

const companyUbicationRoutes = Router();

companyUbicationRoutes.post("/create-company-ubication", createCtrl);

export default companyUbicationRoutes;
