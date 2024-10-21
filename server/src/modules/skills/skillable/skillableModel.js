import { DataTypes, sequelize } from "../../../config/db.js";

export const Skillable = sequelize.define("skillable", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    skillId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    skillableId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    skillableType: {
        type: DataTypes.ENUM("experience", "project", "profile", "job", "certifications", "education", "idea")
    }
})