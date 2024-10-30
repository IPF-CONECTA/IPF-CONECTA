import { Router } from "express";
import { isToken } from "../../middlewares/jwt/isVerifiedAccount.js";
import { getProfileByUsernameCtrl } from "./profileControllers.js";

const profileRoutes = Router()

profileRoutes.get('/get-user-profile/:username', isToken, getProfileByUsernameCtrl)

export default profileRoutes