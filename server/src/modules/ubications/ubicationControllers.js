import {
  findAllCountriesSvc,
  findCountrySvc,
  findUbicationSvc,
  findAllCitiesSvc,
  findAllStatesSvc,
} from "./ubicationServices.js";

export const findUbicationCtrl = async (req, res) => {
  const { query } = req.params;
  try {
    const results = await findUbicationSvc(query);
    if (results.length < 1) throw new Error("No se encontraron coincidencias");

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const findCitiesCtrl = async (req, res) => {
  try {
    const cities = await findAllCitiesSvc();
    res.status(200).json(cities);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const findAllStatesCtrl = async (req, res) => {
  try {
    const states = await findAllStatesSvc();
    res.status(200).json(states);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const findCountryCtrl = async (req, res) => {
  const { country } = req.query;
  try {
    const results = await findCountrySvc(country);
    if (results.length < 1) throw new Error("No se encontraron coincidencias");

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const findAllCountriesCtrl = async (req, res) => {
  try {
    const countries = await findAllCountriesSvc();
    res.status(200).json(countries);
  } catch (error) {
    throw new Error(error.message);
  }
};
