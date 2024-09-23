import { Router } from "express";
import { eraseIdea, createIdea, fetchIdeas, fetchProjectDetails, modifyIdea} from "./ideaController.js";

const router = Router();

router.post("/idea", createIdea);
router.get("/idea", fetchIdeas);
router.get("/idea/:id", fetchProjectDetails);
router.put("/idea/:id", modifyIdea);
router.delete("/idea/:id", eraseIdea);

export default router;

