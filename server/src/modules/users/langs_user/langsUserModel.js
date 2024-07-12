import { sequelize, DataTypes } from "../../../config/db.js";

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
    langLevelId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false

    }
}, {
    timestamps: false
}
)