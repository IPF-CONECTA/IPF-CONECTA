import { Router } from "express";
import { isToken } from "../../middlewares/jwt/isVerifiedAccount.js";
import { getProfileByUsernameCtrl, updateProfileCtrl } from "./profileControllers.js";

const profileRoutes = Router()

profileRoutes.get('/get-user-profile/:username', isToken, getProfileByUsernameCtrl)
profileRoutes.put('/update-profile', isToken, updateProfileCtrl)


export default profileRoutes