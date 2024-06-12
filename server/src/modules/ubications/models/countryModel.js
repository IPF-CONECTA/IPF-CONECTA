import { sequelize, DataTypes } from "../../../config/db.js";
import countryData from './data/countries.json' assert { type: 'json' };


export const Country = sequelize.define('country', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    phoneCode: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    emoji: {
        type: DataTypes.STRING(191),
        allowNull: true
    }
}, {
    timestamps: false
});

export const createCountries = async () => {
    try {
        await Country.bulkCreate(countryData);
        console.log(`${countryData.length} countries imported successfully.`);
    } catch (error) {
        console.error('Failed to import countries:', error);
    }
}