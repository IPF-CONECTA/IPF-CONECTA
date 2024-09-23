import { Router } from "express";
import { createPostCtrl, getPostByIdCtrl, getPostsCtrl } from "./postControllers.js";
import { isToken } from "../../middlewares/jwt/isVerifiedAccount.js";

const postRoutes = Router();

postRoutes.get("/posts", isToken, getPostsCtrl)
postRoutes.get("/post/:postId", isToken, getPostByIdCtrl)
postRoutes.post("/post", isToken, createPostCtrl)

export default postRoutes;