import { Router } from "express";
import { isToken } from "../../middlewares/jwt/isVerifiedAccount.js";
import { getProfileByIdCtrl } from "./profileControllers.js";

const profileRoutes = Router()

profileRoutes.get('/get-user-profile/:username', isToken, getProfileByIdCtrl)


export default profileRoutes