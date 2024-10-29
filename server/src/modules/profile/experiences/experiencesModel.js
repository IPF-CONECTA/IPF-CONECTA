import { DataTypes, sequelize } from "../../../config/db.js";


export const Experience = sequelize.define('experience', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contractTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    companyId: {
        type: DataTypes.UUID,
        allowNull: true
    },
    locationableId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    locationableType: {
        type: DataTypes.ENUM("City", "State", "Country"),
        allowNull: false
    },
    modalityId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    profileId: {
        type: DataTypes.UUID,
        allowNull: false
    },

})