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
}
