import { Op } from "sequelize";
import { City } from "./models/cityModel.js";
import { State } from "./models/stateModel.js";
import { Country } from "./models/countryModel.js";

export const findLocationSvc = async (query) => {
  try {
    const countries = await Country.findAll({
      where: {
        [Op.or]: [{ name: { [Op.iLike]: `%${query}%` } }],
      },
      limit: 10,
      attributes: ["id", "name"],
    });
    const states = await State.findAll({
      where: {
        [Op.or]: [{ name: { [Op.iLike]: `%${query}%` } }],
      },
      limit: 10,
      include: [
        {
          model: Country,
          attributes: ["id", "name"],
        },
      ],
    });

    const cities = await City.findAll({
      where: {
        [Op.or]: [{ name: { [Op.iLike]: `%${query}%` } }],
      },
      limit: 10,
      attributes: { exclude: ["stateId"] },
      include: [
        {
          model: State,
          attributes: ["id", "name"],
          include: [
            {
              model: Country,
              attributes: ["id", "name"],
            },
          ],
        },
      ],
    });
    const formattedResults = [
      ...countries.map(country => ({
        id: country.id,
        type: 'Country',
        name: country.name
      })),
      ...states.map(state => ({
        id: state.id,
        type: 'State',
        name: `${state.dataValues.name}, ${state.dataValues.country.name}`
      })),
      ...cities.map(city => ({
        id: city.id,
        type: 'City',
        name: `${city.dataValues.name}, ${city.dataValues.state.name}, ${city.dataValues.state.country.name}`
      }))
    ];
    return formattedResults;
  } catch (error) {
    console.log(error)
    throw new Error(error.message);
  }
};

export const findAllCountriesSvc = async () => {
  try {
    const countries = await Country.findAll({});
    return countries;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const findStatesByCountryIdSvc = async (countryId) => {
  try {
    const states = await State.findAll({
      where: {
        countryId,
      },
    });
    return states;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const findCitiesByStateIdSvc = async (stateId) => {
  try {
    const cities = await City.findAll({
      where: { stateId },
    });
    return cities;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getLocationByIdSvc = async (id, type) => {
  try {
    let location;
    if (type === "Country") {
      location = await Country.findByPk(id);
    } else if (type === "State") {
      location = await State.findByPk(id, {
        include: [
          {
            model: Country,
          },
        ],
      });
    } else if (type === "City") {
      location = await City.findByPk(id, {
        include: [
          {
            model: State,
            include: [
              {
                model: Country,
              },
            ],
          },
        ],
      });
    }
    return type === "Country" ? location.name :
      type === "State" ? `${location.name}, ${location.country.name}` :
        `${location.name}, ${location.state.name}, ${location.state.country.name}`
  } catch (error) {
    throw new Error(error.message);
  }
}