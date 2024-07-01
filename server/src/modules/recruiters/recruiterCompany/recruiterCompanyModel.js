import { sequelize, DataTypes } from "../../../config/db.js";

export const RecruiterCompanies = sequelize.define('recruiterCompanies', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    companyId: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    timestamps: true
})