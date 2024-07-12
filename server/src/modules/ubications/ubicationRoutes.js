import { Router } from "express"
import { findUbicationCtrl } from "./ubicationControllers.js"


export const ubicationRoutes = Router()

ubicationRoutes.get('/find-ubication/:query', findUbicationCtrl)

export default ubicationRoutes