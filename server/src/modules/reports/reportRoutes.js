import { Router } from "express";
import { createReportCtrl } from "./reportControllers.js";

const reportRoutes = Router()

reportRoutes.post("/report", createReportCtrl)
reportRoutes.get("/reports", getReportsCtrl)
export default reportRoutes