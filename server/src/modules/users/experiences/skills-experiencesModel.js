import { sequelize, DataTypes } from "../../../config/db";


export const skillExperience = sequelize.define('skillExperience', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    experienceId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    skillId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})