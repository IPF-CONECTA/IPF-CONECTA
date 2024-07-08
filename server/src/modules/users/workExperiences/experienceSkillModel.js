import { sequelize, DataTypes } from "../../../config/db.js";


export const ExperienceSkill = sequelize.define('experienceSkill', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    experienceId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    skillId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})