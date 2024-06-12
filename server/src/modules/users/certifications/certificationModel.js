import { sequelize, DataTypes } from "../../../config/db";

export const Certification = sequelize.define('certification', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    entity: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true
    }
})  