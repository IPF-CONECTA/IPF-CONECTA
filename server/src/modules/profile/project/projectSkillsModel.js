import { DataTypes, sequelize } from "../../../config/db.js";

export const ProjectSkills = sequelize.define("projectSkills", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    projectId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    skillId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});