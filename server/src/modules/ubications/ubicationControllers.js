import {
  findAllCountriesSvc,
  findStatesByCountryIdSvc,
  findCitiesByStateIdSvc,
  findUbicationSvc,
} from "./ubicationServices.js";

export const findUbicationCtrl = async (req, res) => {
  let { query } = req.query;
  if (!query) query = ''
  try {
    const results = await findUbicationSvc(query);
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

export const findStatesByCountryIdCtrl = async (req, res) => {
  const { id } = req.params;
  try {
    const states = await findStatesByCountryIdSvc(id);
    res.status(200).json(states);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const findCitiesByStateIdCtrl = async (req, res) => {
  const { id } = req.params;
  try {
    const cities = await findCitiesByStateIdSvc(id);
    res.status(200).json(cities);
  } catch (error) {
    throw new Error(error.message);
  }
};
