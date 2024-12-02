import { sequelize, DataTypes } from '../../../config/db.js';
import { stateData } from './data/states.js';

export const State = sequelize.define('state', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    countryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

},
    {
        timestamps: false
    });



export const createStates = async () => {
    try {
        await State.bulkCreate(stateData);
        console.log(`${stateData.length} states imported successfully.`);
    } catch (error) {
        console.error('Failed to import states:', error);
    }
}