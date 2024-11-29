import { Router } from "express";
import {
  createPostCtrl,
  deletePostCtrl,
  getPostByIdCtrl,
  getPostsCtrl,
  getProfilePostsByUsernameCtrl,
} from "./postControllers.js";
import { isToken } from "../../middlewares/jwt/isVerifiedAccount.js";
import upload from "../../config/multerConfig.js";

const postRoutes = Router();

postRoutes.get("/posts", isToken, getPostsCtrl);
postRoutes.get("/post/:postId", isToken, getPostByIdCtrl);
postRoutes.get("/posts/:username", isToken, getProfilePostsByUsernameCtrl);
postRoutes.post("/post", isToken, upload.array("images", 4), createPostCtrl);
postRoutes.delete("/post/:postId", isToken, deletePostCtrl);

export default postRoutes;
