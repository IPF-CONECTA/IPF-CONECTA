import { sequelize, DataTypes } from "../../../config/db.js";

export const Job = sequelize.define('job', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    companyId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    locationableId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    locationableType: {
        type: DataTypes.ENUM("country", "state", "city"),
        allowNull: false
    },
    profileId: {
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
    modalityId: { // presencial - remoto - híbrido - flexible
        type: DataTypes.INTEGER,
        allowNull: false
    },
    contractTypeId: { // full-time, part-time, freelance, etc
        type: DataTypes.INTEGER,
        allowNull: false
    },
    applicationLink: {
        type: DataTypes.STRING,
        allowNull: true
    }
})