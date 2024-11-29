import { sequelize, DataTypes } from "../../../../config/db.js";
import { institutesData } from "./institutes.js";
export const Institute = sequelize.define("institute", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
})

export const createInstitutes = async () => {
    try {
        await Institute.bulkCreate(institutesData);
        console.log(`${institutesData.length} institutions imported successfully.`);
    } catch (error) {
        console.error('Failed to import institutions:', error);
    }
}