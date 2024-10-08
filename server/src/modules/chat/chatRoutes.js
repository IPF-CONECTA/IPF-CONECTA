import { Router } from "express";
import { isToken } from "../../middlewares/jwt/isVerifiedAccount.js";
import { getChatIdCtrl, getProfileChatsCtrl } from "./chatControllers.js";

const chatRoutes = Router();

chatRoutes.get("/get-chat/:username", isToken, getChatIdCtrl);
chatRoutes.get("/get-profile-chats", isToken, getProfileChatsCtrl);

export default chatRoutes;
