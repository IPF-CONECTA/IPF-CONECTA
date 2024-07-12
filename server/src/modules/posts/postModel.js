import { sequelize, DataTypes } from '../../config/db.js'

export const Post = sequelize.define('post', {
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.STRING(36)
    },
    userId: {
        allowNull: false,
        type: DataTypes.STRING(36)
    },
    postId: {
        allowNull: true,
        type: DataTypes.STRING(36)
    },
    forumId: {
        allowNull: true,
        type: DataTypes.STRING(36)
    },
    content: {
        allowNull: false,
        type: DataTypes.TEXT()
    }
})  