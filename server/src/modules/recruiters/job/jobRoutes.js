import { Router } from "express";
import {
  isApprovedAssociation,
  isRecruiter,
} from "../../../middlewares/jwt/isRecruiter.js";
import {
  createNewJobCtrl,
  findJobsCtrl,
  getJobByIdCtrl,
  getJobsCtrl,
} from "./jobControllers.js";
import { jobSchema } from "./jobSchema.js";
import { validateSchema } from "../../../middlewares/expressValidator.js";
import {
  isToken,
  isVerifiedAccount,
} from "../../../middlewares/jwt/isVerifiedAccount.js";
const jobRoutes = Router();

jobRoutes.post(
  "/create-job",
  isToken,
  jobSchema,
  validateSchema,
  isRecruiter,
  isApprovedAssociation,
  createNewJobCtrl
);
// LA RUTA DE ARRIBA COMPRUEBA SI HAY UN TRABAJO DUPLICADO CON EL MISMO USUARIO Y EMPRESA
// LA DE ABAJO ES PARA CONFIRMAR Y CREAR EN CASO DE QUE SE QUIERA CREAR UN TRABAJO CON EL MISMO NOMBRE
jobRoutes.post(
  "/create-duplicated-job",
  isRecruiter,
  isApprovedAssociation,
  createNewJobCtrl
);

jobRoutes.get("/get-jobs", getJobsCtrl);

jobRoutes.get("/get-job/:id", isToken, getJobByIdCtrl);

jobRoutes.get("/job/search", findJobsCtrl);

export default jobRoutes;
