import { Router } from "express";
import {
  getDisciplinesCtrl,
  getDisciplineByIdCtrl,
} from "./disciplineControllers.js";
const disciplineRoutes = Router();

disciplineRoutes.get("/", getDisciplinesCtrl);
disciplineRoutes.get("/:id", getDisciplineByIdCtrl);

export default disciplineRoutes;
