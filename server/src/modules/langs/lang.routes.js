import express from "express";
import { getLangs, getLangLevels } from "./lang.controller.js";

const router = express.Router();

router.get("/langs", getLangs);
router.get("/lang-levels", getLangLevels);

export default router;
