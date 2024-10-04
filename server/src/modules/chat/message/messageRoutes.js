import { Router } from "express";

import { isToken } from "../../../middlewares/jwt/isVerifiedAccount.js";
import { createMessageCtrl } from "./messageControllers.js";

const messageRoutes = Router();

messageRoutes.post("/send/:username", isToken, createMessageCtrl);

export default messageRoutes;
