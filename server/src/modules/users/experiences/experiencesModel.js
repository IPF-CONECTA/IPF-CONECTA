import { DataTypes, sequelize } from "../../../config/db";


export const WorkExperiences = sequelize.define('workExperience', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type_job: {
        type: DataTypes.UUID,
        allowNull: false
    },
    company: {
        type: DataTypes.STRING,
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
    studentId: {
        type: DataTypes.UUID,
        allowNull: false
    },

})