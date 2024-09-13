import express from "express";
import { __dirname } from "./helpers/__dirname.js";
import { Router } from "express";
import path from "path";

//ruta para traer las imagenes
const uploadRoutes = Router()
uploadRoutes.use('/logoUrl', express.static(path.join(__dirname, '../../uploads/logoUrls')));
uploadRoutes.use('/perfil', express.static(path.join(__dirname, '../../uploads/profiles')));

export default  uploadRoutes;