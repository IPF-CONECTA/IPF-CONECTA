import { Router } from "express";
import { getReportByIdCtrl, getReportsFiltered, resolveReport } from "./reportControllers.js";
import { isAdmin } from "../../../../middlewares/jwt/isAdmin.js";
const reportAdminRoutes = Router()

reportAdminRoutes.get("/report", isAdmin, getReportsFiltered)
reportAdminRoutes.get("/report/:id", isAdmin, getReportByIdCtrl)
reportAdminRoutes.patch("/report/:id", isAdmin, resolveReport)

export default reportAdminRoutes