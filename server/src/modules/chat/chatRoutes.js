import { Router } from "express";
import { createChatCtrl, getChatsByProfileIdCtrl } from "./chatController.js";
import { isToken } from "../../middlewares/jwt/isVerifiedAccount.js";

const chatRouter = Router();

chatRouter.post("/create", isToken, createChatCtrl);
chatRouter.get("/get-chats", isToken, getChatsByProfileIdCtrl);

export default chatRouter;
