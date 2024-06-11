import { sequelize, DataTypes } from '../../config/db.js'

export const PostDocument = sequelize.define('postDocument', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    url: {
        type: DataTypes.STRING(),
        allowNull: false
    }
})