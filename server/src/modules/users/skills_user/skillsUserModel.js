import { sequelize, DataTypes } from "../../../config/db.js";

export const SkillsUser = sequelize.define('skillsUser', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    skillId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
})
