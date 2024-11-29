import { sequelize, DataTypes } from '../../config/db.js'

export const Report = sequelize.define('report', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    status: {
        type: DataTypes.ENUM('pending', 'resolved'),
        allowNull: false,
        defaultValue: 'pending'
    },
    reasonId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    reportableId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    reportableType: {
        type: DataTypes.ENUM('post', 'user', 'job'),
        allowNull: false
    },
    profileId: {
        allowNull: false,
        type: DataTypes.UUID,
    }
})