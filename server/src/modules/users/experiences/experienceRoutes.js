import { Router } from "express";
import { createExperience, getExperiencesByProfile } from "./experienceControllers.js";
import { isToken } from '../../..//middlewares/jwt/isVerifiedAccount.js'
import upload from "../../../config/multerConfig.js";
const experienceRoutes = Router()

experienceRoutes.get('/experiences/:username', isToken, getExperiencesByProfile)
experienceRoutes.post('/experience/:username', isToken, upload.array('images', 10), createExperience)
experienceRoutes.patch('/experience/:username', isToken)
export default experienceRoutes