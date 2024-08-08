import { Router } from "express"
import { findAllCountriesCtrl, findCountryCtrl, findUbicationCtrl } from "./ubicationControllers.js"


export const ubicationRoutes = Router()

ubicationRoutes.get('/find-ubication/:query', findUbicationCtrl)
ubicationRoutes.get('/find-country', findCountryCtrl)
ubicationRoutes.get('/countries', findAllCountriesCtrl)

export default ubicationRoutes