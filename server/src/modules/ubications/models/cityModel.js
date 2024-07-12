import { sequelize, DataTypes } from "../../../config/db.js";

export const City = sequelize.define('city', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        collate: 'utf8mb4_unicode_ci',
    },
    state_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

}, {
    timestamps: false,

});
