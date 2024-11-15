import e, { Router } from "express";

import {
  createEducationCtrl,
  getEducationsByUsernameCtrl,
  getEducationByIdCtrl,
  deleteEducationCtrl,
  editEducationCtrl,
} from "./educationControllers.js";
import { isToken } from "../../../middlewares/jwt/isVerifiedAccount.js";

const educationsRoutes = Router();

educationsRoutes.post("/add", isToken, createEducationCtrl);
educationsRoutes.get("/:id", isToken, getEducationByIdCtrl);
educationsRoutes.get(
  "/profile/:username",
  isToken,
  getEducationsByUsernameCtrl
);
educationsRoutes.patch("/:id/edit", isToken, editEducationCtrl);
educationsRoutes.delete("/:id/delete", isToken, deleteEducationCtrl);
export default educationsRoutes;
