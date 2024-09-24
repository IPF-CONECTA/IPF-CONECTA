import { Router } from "express";
import { isToken } from "../../middlewares/jwt/isVerifiedAccount.js";
import { getProfileByIdCtrl } from "./profileControllers.js";
import { getProfileById } from "./profileServices.js";

const profileRoutes = Router()

profileRoutes.get('/get-user-profile/:profileId', isToken, getProfileByIdCtrl)
profileRoutes.get('/get-user-profil', isToken, getProfileById)

export default profileRoutes