import { sequelize, DataTypes } from "../../../config/db.js";

export const Vote = sequelize.define("vote", {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    profileId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    ideaId: {
        type: DataTypes.UUID,
        allowNull: false,
    }
});