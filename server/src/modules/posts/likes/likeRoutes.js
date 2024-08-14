import { Router } from "express";
import { likeCtrl } from "./likeControllers.js";
import { isToken } from "../../../middlewares/jwt/isVerifiedAccount.js";
const likeRoutes = Router();

likeRoutes.post("/like/:postId", isToken, likeCtrl);

export default likeRoutes;