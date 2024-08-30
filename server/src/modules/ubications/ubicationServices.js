import { Op } from "sequelize";
import { City } from "./models/cityModel.js";
import { State } from "./models/stateModel.js";
import { Country } from "./models/countryModel.js";

// export const findUbicationSvc = async (query) => {
//   try {
//     const cities = await City.findAll({
//       where: {
//         [Op.or]: [{ name: { [Op.iLike]: `%${query}%` } }],
//       },
//       attributes: { exclude: ["stateId"] },
//       include: [
//         {
//           model: State,
//           attributes: ["id", "name"],
//           include: [
//             {
//               model: Country,
//               attributes: ["id", "name"],
//             },
//           ],
//         },
//       ],
//     });
//     const states = await State.findAll({
//       where: {
//         [Op.or]: [{ name: { [Op.iLike]: `%${query}%` } }],
//       },
//       include: [
//         {
//           model: Country,
//           attributes: ["id", "name"],
//         },
//       ],
//     });
//     const countries = await Country.findAll({
//       where: {
//         [Op.or]: [{ name: { [Op.iLike]: `%${query}%` } }],
//       },
//       attributes: ["id", "name"],
//     });
//     return [cities, states, countries];
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

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
