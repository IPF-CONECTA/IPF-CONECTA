import { Router } from "express";
import { repostCtrl } from "./repostControllers.js";
import { isToken } from "../../../middlewares/jwt/isVerifiedAccount.js";

const repostRoutes = Router();

repostRoutes.post("/repost", isToken, repostCtrl)


export default repostRoutes;