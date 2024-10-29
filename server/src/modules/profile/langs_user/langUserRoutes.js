import { Router } from "express";
import {
  getLangsByProfileId,
  addLang,
  updateLang,
  deleteLang,
} from "./langUserController.js";

const router = Router();

router.get("/langs/:username", getLangsByProfileId);
router.post("/langs/:username", addLang);
router.put("/langs/:id", updateLang);
router.delete("/langs/:id", deleteLang);

export default router;
