import { sequelize, DataTypes } from '../../config/db.js'

export const Report = sequelize.define('report', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    reasonId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    postId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    userId: {
        allowNull: false,
        type: DataTypes.UUID,
    }
})