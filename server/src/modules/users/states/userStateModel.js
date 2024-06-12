import { sequelize, DataTypes } from "../../../config/db.js";

export const UserState = sequelize.define('userState', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    state: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
})

export const createUserStates = async () => {
    try {
        await UserState.bulkCreate([
            { state: 'Buscando trabajo' },
            { state: 'Reclutando' },
            { state: 'none' }
        ])
    } catch (error) {
        console.error('Failed to import states:', error);
    }
}