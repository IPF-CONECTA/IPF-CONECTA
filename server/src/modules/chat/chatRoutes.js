import { Router } from "express";
import { isToken } from "../../middlewares/jwt/isVerifiedAccount.js";
import { getChatIdCtrl } from "./chatControllers.js";

const chatRoutes = Router();

chatRoutes.get("/get-chat", getChatIdCtrl);

export default chatRoutes;
