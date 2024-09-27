import { Router } from "express";
import { voteCtrl } from "./voteControllers.js";
import { isToken } from "../../../middlewares/jwt/isVerifiedAccount.js";
const voteRoutes = Router()

voteRoutes.post("/idea/:ideaId/vote", isToken, voteCtrl)

export default voteRoutes