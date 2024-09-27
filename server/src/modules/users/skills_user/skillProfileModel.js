import { sequelize, DataTypes } from "../../../config/db.js";

export const SkillsProfile = sequelize.define('skillsProfile', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    skillId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    profileId: {
        type: DataTypes.UUID,
        allowNull: false
    },
})