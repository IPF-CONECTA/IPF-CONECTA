import { Router } from "express";

import { isToken } from "../../../middlewares/jwt/isVerifiedAccount.js";
import { createChatOrSendMessageCtrl } from "./messageControllers.js";

const messageRoutes = Router();

messageRoutes.post("/send/:username", isToken, createChatOrSendMessageCtrl);

export default messageRoutes;
