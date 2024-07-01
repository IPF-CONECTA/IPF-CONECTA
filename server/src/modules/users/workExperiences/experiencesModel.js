import { DataTypes, sequelize } from "../../../config/db.js";


export const WorkExperience = sequelize.define('workExperience', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contractType: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    companyId: {
        type: DataTypes.UUID,
        allowNull: false
    },

    ubicationId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    typeUbication: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },

})