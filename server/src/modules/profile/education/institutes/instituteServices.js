import { Op } from "sequelize";
import { Institute } from "./instituteModel.js";

export const findInstitutes = async (query) => {
  try {
    const institutes = await Institute.findAll({
      where: {
        name: {
          [Op.iLike]: `%${query}%`,
        },
      },
    });
    return institutes;
  } catch (error) {
    console.error("Failed to find institutes:", error);
  }
};

export const findInstituteById = async (id) => {
  try {
    const institute = await Institute.findByPk(id);
    return institute;
  } catch (error) {
    console.error("Failed to find institute by id:", error);
  }
};
