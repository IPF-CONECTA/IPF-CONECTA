import { DataTypes, sequelize } from "../../../../config/db.js";

export const JobOfferSkills = sequelize.define('jobOfferSkills', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    jobOfferId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    skillId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
})