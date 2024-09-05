import { Router } from "express";
import { isToken } from "../../middlewares/jwt/isVerifiedAccount.js";
import { getProfileByIdCtrl } from "./profileControllers.js";

export const profileRoutes = Router()

profileRoutes.get('/get-user-profile/:profileId', isToken, getProfileByIdCtrl)