import { Router } from "express";
import { createPostCtrl, getPostsCtrl } from "./postControllers.js";
import { isToken } from "../../middlewares/jwt/isVerifiedAccount.js";

const postRoutes = Router();

postRoutes.get("/inicio", isToken, getPostsCtrl)
postRoutes.post("/post", isToken, createPostCtrl)

export default postRoutes;