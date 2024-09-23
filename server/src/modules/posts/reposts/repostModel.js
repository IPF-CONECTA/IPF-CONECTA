import { DataTypes, sequelize } from "../../../config/db.js";

export const Repost = sequelize.define("repost", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    postId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    profileId: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    timestamps: true,
    updatedAt: false
})