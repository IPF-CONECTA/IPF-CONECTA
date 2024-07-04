import { sequelize, DataTypes } from "../../../config/db.js";

export const Job = sequelize.define('job', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    companyId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    locationId: { // provincia o localidad
        type: DataTypes.INTEGER,
        allowNull: true
    },
    contractTypeId: { // full-time, part-time, freelance, etc
        type: DataTypes.INTEGER,
        allowNull: false
    }
})