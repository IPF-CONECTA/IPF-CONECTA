import { sequelize } from "../../../config/db";

export const LangsUser = sequelize.define('langsUser', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    langId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    levelId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})