import { Router } from "express";
import { isToken } from "../../middlewares/jwt/isVerifiedAccount.js";
import { followOrUnfollowCtrl } from "./followerControllers.js";

const followerRoutes = Router();

followerRoutes.post('/follow/:idToFollow', isToken, followOrUnfollowCtrl);

export default followerRoutes;