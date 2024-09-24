import { Router } from "express";
import { isToken } from "../../middlewares/jwt/isVerifiedAccount.js";
import { getProfileByIdCtrl } from "./profileControllers.js";

const profileRoutes = Router()

profileRoutes.get('/get-user-profile/:profileId', isToken, getProfileByIdCtrl)


export default profileRoutes