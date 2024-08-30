import { Router } from "express";
import { isToken } from "../../middlewares/jwt/isVerifiedAccount.js";
import { getProfile } from "./profileControllers.js";

export const profileRoutes = Router()

profileRoutes.get('/get-user-profile/:profileId', isToken, getProfile)