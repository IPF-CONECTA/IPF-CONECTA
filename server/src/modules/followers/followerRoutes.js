import { Router } from "express";
import { isToken } from "../../middlewares/jwt/isVerifiedAccount.js";
import { followOrUnfollowCtrl, getConnectionsCtrl } from "./followerControllers.js";

const followerRoutes = Router();

followerRoutes.post('/follow/:username', isToken, followOrUnfollowCtrl);
followerRoutes.get(`/connections/:username/:type`, isToken, getConnectionsCtrl);

export default followerRoutes;