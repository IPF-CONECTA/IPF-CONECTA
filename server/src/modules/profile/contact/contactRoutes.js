import { Router } from "express";
import { getPrefixesCtrl } from "./contactControllers.js";

const contactRoutes = Router()

contactRoutes.get('/prefixes', getPrefixesCtrl)

export default contactRoutes