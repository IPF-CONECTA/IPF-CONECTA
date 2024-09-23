import { sequelize, DataTypes } from '../../config/db.js'

export const Post = sequelize.define('post', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    profileId: {
        allowNull: false,
        type: DataTypes.UUID
    },
    postId: {
        allowNull: true,
        type: DataTypes.UUID
    },
    forumId: {
        allowNull: true,
        type: DataTypes.UUID
    },
    content: {
        allowNull: false,
        type: DataTypes.TEXT()
    }
})  