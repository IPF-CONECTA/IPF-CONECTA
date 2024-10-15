import express from "express";
import {
  getLangs,
  updateLang,
  deleteLang,
  getLangLevels,
  updateLangLevel,
  deleteLangLevel,
} from "./lang.controller.js";

const router = express.Router();

router.get("/langs", getLangs);
router.put("/langs/:id", updateLang);
router.delete("/langs/:id", deleteLang);
router.get("/lang-levels", getLangLevels);
router.put("/lang-levels/:id", updateLangLevel);
router.delete("/lang-levels/:id", deleteLangLevel);

export default router;
