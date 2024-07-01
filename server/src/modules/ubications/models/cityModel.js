import { sequelize, DataTypes } from "../../../config/db.js";
import cityData from './data/cities.json' assert { type: 'json' };
import { State } from "./stateModel.js";


export const City = sequelize.define('city', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    stateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

}, {
    timestamps: false,

});


export const createCities = async () => {
    try {
        await City.bulkCreate(cityData);
        console.log(`${cityData.length} cities imported successfully.`);
    } catch (error) {
        console.error('Failed to import cities:', error);
    }
}