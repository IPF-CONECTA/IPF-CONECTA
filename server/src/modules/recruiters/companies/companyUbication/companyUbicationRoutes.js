import { Router } from "express";
import { createCompamyUbicationCtrl } from "./companyUbicationControllers.js";

const companyUbicationRoutes = Router();

companyUbicationRoutes.post(
  "/create-company-ubication",
  createCompamyUbicationCtrl
);

export default companyUbicationRoutes;
