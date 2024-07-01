import { sequelize, DataTypes } from "../../../config/db.js";

export const JobOffer = sequelize.define('jobOffer', {
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
    userID: {
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
    location: { // provincia o localidad
        type: DataTypes.INTEGER,
        allowNull: false
    },
    contractTypeId: { // full-time, part-time, freelance, etc
        type: DataTypes.INTEGER,
        allowNull: false
    }
})