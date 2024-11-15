import { Router } from "express";
import { findInstituteCtrl } from "./instituteControllers.js";


const instituteRoutes = Router();

instituteRoutes.get("/find-institute", findInstituteCtrl);

export default instituteRoutes;