import { DataTypes, sequelize } from "../../../../config/db.js";

export const JobSkills = sequelize.define('jobSkills', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    skillId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
})