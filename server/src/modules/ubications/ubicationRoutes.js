import { Router } from "express";
import {
  findAllCountriesCtrl,
  findCountryCtrl,
  findUbicationCtrl,
  findAllStatesCtrl,
  findCitiesCtrl,
} from "./ubicationControllers.js";

export const ubicationRoutes = Router();

ubicationRoutes.get("/find-ubication/:query", findUbicationCtrl);
ubicationRoutes.get("/find-country", findCountryCtrl);
ubicationRoutes.get("/countries", findAllCountriesCtrl);
ubicationRoutes.get("/states", findAllStatesCtrl);
ubicationRoutes.get("/cities", findCitiesCtrl);

export default ubicationRoutes;
