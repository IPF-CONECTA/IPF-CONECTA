import { Router } from "express";
import { isToken } from "../../../middlewares/jwt/isVerifiedAccount.js"
import { updateProfilePicCtrl } from "./profilePicControllers.js";
import upload from "../../../config/multerConfig.js";
const profilePicRoutes = Router();
profilePicRoutes.post("/update-profile-pic", upload.single("images"), isToken, updateProfilePicCtrl)

export default profilePicRoutes