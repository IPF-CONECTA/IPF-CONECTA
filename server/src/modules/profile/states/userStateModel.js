import { sequelize, DataTypes } from "../../../config/db.js";

export const UserState = sequelize.define('userState', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userState: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
})

export const createUserStates = async () => {
    try {
        await UserState.bulkCreate([
            { userState: 'none' },
            { userState: 'Buscando trabajo' },
            { userState: 'Reclutando' },
        ])
    } catch (error) {
        console.error('Failed to import states:', error);
    }
}