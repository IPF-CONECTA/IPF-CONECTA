import { sequelize, DataTypes } from "../../../config/db.js";
import { Sequelize } from "sequelize";

export const Like = sequelize.define('like', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    likedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    postId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    }
},
    {
        timestamps: false
    })