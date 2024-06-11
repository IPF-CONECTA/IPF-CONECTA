import { sequelize, DataTypes } from "../../../config/db.js";

export const Country = sequelize.define('country', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    phone_code: {
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

