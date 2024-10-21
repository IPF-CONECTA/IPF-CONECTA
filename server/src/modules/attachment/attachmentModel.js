import { DataTypes, sequelize } from '../../config/db.js'

export const Attachment = sequelize.define('attachment', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    attachmentableId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    attachmentableType: {
        type: DataTypes.ENUM('project', 'post', 'experience', 'education', 'company', 'certificate', 'profilePic', 'logo'),
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    docType: {
        type: DataTypes.STRING, // por ejemplo 'image' o 'video'
        allowNull: false
    }
});