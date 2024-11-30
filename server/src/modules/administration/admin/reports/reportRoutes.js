import { Router } from "express";
import { getReportsFiltered } from "./reportControllers.js";
import { isAdmin } from "../../../../middlewares/jwt/isAdmin.js";
const reportAdminRoutes = Router()

reportAdminRoutes.get("/reports", isAdmin, getReportsFiltered)

export default reportAdminRoutes