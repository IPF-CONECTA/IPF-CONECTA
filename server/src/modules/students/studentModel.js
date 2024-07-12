import { sequelize, DataTypes } from '../../config/db.js'


export const Student = sequelize.define('student', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    about: {
        type: DataTypes.STRING(),
        allowNull: true,
    },
    profilePic: {
        type: DataTypes.STRING(),
        allowNull: false,
        //AQUI TENDRIA QUE IR EL DEFAULT PFP CON EL URL DE CLOUDINARY
        defaultValue: 'https://socialsphere.atwebpages.com/default-avatar.jpg'
    },
    openToWork: {
        type: DataTypes.BOOLEAN(),
        defaultValue: false,
    }
})