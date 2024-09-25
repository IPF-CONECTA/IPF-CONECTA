import { Router } from "express";
import {
  createIdea,
  getIdeas,
  getIdeaDetails,
  updateIdea,
  deleteIdea,
} from "./ideaController.js";
import { isToken } from "../../middlewares/jwt/isVerifiedAccount.js";

const router = Router();

router.post("/idea", isToken, createIdea);
router.get("/idea", isToken, getIdeas);
router.get("/idea/:id", isToken, getIdeaDetails);
router.put("/idea/:id", isToken, updateIdea);
router.delete("/idea/:id", isToken, deleteIdea);

export default router;
