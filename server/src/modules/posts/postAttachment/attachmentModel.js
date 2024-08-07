import { UUIDV4 } from "sequelize";
import { DataTypes, sequelize } from "../../../config/db.js";

export const Attachment = sequelize.define('attachment', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    postId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('video', 'image'), // por ejemplo 'image' o 'video'
        allowNull: false
    }
});