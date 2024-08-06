import { Router } from "express"
import { findCountryCtrl, findUbicationCtrl } from "./ubicationControllers.js"


export const ubicationRoutes = Router()

ubicationRoutes.get('/find-ubication/:query', findUbicationCtrl)
ubicationRoutes.get('/find-country', findCountryCtrl)

export default ubicationRoutes