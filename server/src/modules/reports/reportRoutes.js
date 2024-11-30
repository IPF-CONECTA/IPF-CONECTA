import { Router } from "express";
import { createReportCtrl } from "./reportControllers.js";
import { getReportReasonsCtrl } from "./reasons/reasonControllers.js";
import { isToken } from "../../middlewares/jwt/isVerifiedAccount.js";

const reportRoutes = Router()

// reportRoutes.get("/report", getReportsCtrl)
// reportRoutes.get("/report/:id", getReportById)
reportRoutes.get("/report-reasons", getReportReasonsCtrl)
reportRoutes.post("/report", isToken, createReportCtrl)
export default reportRoutes