import { Router } from "express";
import { createPostCtrl, getPostByIdCtrl, getPostsCtrl } from "./postControllers.js";
import { isToken } from "../../middlewares/jwt/isVerifiedAccount.js";
import upload from "../../config/multerConfig.js";

const postRoutes = Router();

postRoutes.get("/posts", isToken, getPostsCtrl)
postRoutes.get("/post/:postId", isToken, getPostByIdCtrl)
postRoutes.post("/post", isToken, upload.array("images", 4), createPostCtrl)

export default postRoutes;