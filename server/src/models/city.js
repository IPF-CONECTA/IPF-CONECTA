import { sequelize, DataTypes } from "../config/db.js";

export const City = sequelize.define('city', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        collate: 'utf8mb4_unicode_ci',
    },
    state_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },

}, {
    timestamps: false,

});
