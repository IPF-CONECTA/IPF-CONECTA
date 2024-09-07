import { Router } from "express";
import { getExperiencesByProfile } from "./experienceControllers.js";
import { isToken } from '../../..//middlewares/jwt/isVerifiedAccount.js'
const experienceRoutes = Router()

experienceRoutes.get('/experiences/:profileId', isToken, getExperiencesByProfile)

export default experienceRoutes