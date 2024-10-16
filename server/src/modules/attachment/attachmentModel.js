import { DataTypes, sequelize } from '../../config/db.js'

export const Attachment = sequelize.define('attachment', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    attachmentType: {
        type: DataTypes.ENUM('project', 'post', 'experience', 'education', 'company', 'certificate', 'profilePic', 'logo'),
        allowNull: false
    },
    attachmentId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    docType: {
        type: DataTypes.ENUM('video', 'image', 'document'), // por ejemplo 'image' o 'video'
        allowNull: false
    }
});