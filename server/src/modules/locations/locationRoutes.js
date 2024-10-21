import { Router } from "express";
import {
  findLocationCtrl,
  findStatesByCountryIdCtrl,
  findCitiesByStateIdCtrl,
  findAllCountriesCtrl,
} from "./locationControllers.js";

export const locationRoutes = Router();

locationRoutes.get("/find-location", findLocationCtrl);
locationRoutes.get("/find-all-countries", findAllCountriesCtrl);
locationRoutes.get("/states-by-country/:id", findStatesByCountryIdCtrl);
locationRoutes.get("/cities-by-state/:id", findCitiesByStateIdCtrl);

export default locationRoutes;
