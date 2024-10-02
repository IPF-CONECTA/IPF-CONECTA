import { Router } from "express";
import {
  findUbicationCtrl,
  findStatesByCountryIdCtrl,
  findCitiesByStateIdCtrl,
  findAllCountriesCtrl,
} from "./ubicationControllers.js";

export const ubicationRoutes = Router();

ubicationRoutes.get("/find-ubication", findUbicationCtrl);
ubicationRoutes.get("/find-all-countries", findAllCountriesCtrl);
ubicationRoutes.get("/states-by-country/:id", findStatesByCountryIdCtrl);
ubicationRoutes.get("/cities-by-state/:id", findCitiesByStateIdCtrl);

export default ubicationRoutes;
