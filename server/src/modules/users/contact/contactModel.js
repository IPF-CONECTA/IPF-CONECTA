import { sequelize, DataTypes } from "../../../config/db.js";

export const Contact = sequelize.define('contact', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    profileId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    typeContactId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
})