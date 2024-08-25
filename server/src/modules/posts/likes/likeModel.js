import { sequelize, DataTypes } from "../../../config/db.js";

export const Like = sequelize.define('like', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    likedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    postId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    profileId: {
        type: DataTypes.UUID,
        allowNull: false
    }
},
    {
        timestamps: false
    })