import { DataTypes, sequelize } from "../../config/db.js";


export const Follower = sequelize.define('follower', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    followerId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    followingId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
},
    {
        timestamps: false
    }
)