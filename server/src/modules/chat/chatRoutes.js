import { Router } from "express";
import {
  createChatCtrl,
  getChatsByProfileIdCtrl,
  getChatByUserCtrl,
} from "./chatController.js";
import { isToken } from "../../middlewares/jwt/isVerifiedAccount.js";

const chatRoutes = Router();

chatRoutes.get("/get-chats", isToken, getChatsByProfileIdCtrl);
chatRoutes.get("/get-chat/:username", isToken, getChatByUserCtrl);

export default chatRoutes;
