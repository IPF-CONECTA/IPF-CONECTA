import { Router } from "express";
import { createChatCtrl } from "./chatController.js";
import { isToken } from "../../middlewares/jwt/isVerifiedAccount.js";

const chatRouter = Router();

chatRouter.post("/create", isToken, createChatCtrl);

export default chatRouter;
