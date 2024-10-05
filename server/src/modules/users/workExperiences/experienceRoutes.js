import { Router } from "express";
import { createExperience, getExperiencesByProfile } from "./experienceControllers.js";
import { isToken } from '../../..//middlewares/jwt/isVerifiedAccount.js'
const experienceRoutes = Router()

experienceRoutes.get('/experiences/:username', isToken, getExperiencesByProfile)
experienceRoutes.post('/experience/:username', isToken, createExperience)
experienceRoutes.patch('/experience/:username', isToken)
export default experienceRoutes