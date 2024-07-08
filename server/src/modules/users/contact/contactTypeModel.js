import { sequelize, DataTypes } from "../../../config/db.js";

export const ContactType = sequelize.define('contactType', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})