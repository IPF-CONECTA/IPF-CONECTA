import { sequelize, DataTypes } from "../../config/db.js";

export const Idea = sequelize.define("idea", {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    title: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },
    profileId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
});