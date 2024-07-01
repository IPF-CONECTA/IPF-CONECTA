import { sequelize, DataTypes } from '../../config/db.js'
import { generateVerificationCode } from '../../helpers/generateCode.js'

export const User = sequelize.define('user', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    names: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },
    surnames: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },
    cuil: {
        type: DataTypes.STRING(11),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    roleId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    userStateId: {
        type: DataTypes.INTEGER(1),// Buscando trabajo / Reclutando / none
        allowNull: false,
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
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    verifyCode: {
        type: DataTypes.INTEGER(6),
        defaultValue: generateVerificationCode(),
        allowNull: true
    },
    verified: {
        type: DataTypes.BOOLEAN(),
        defaultValue: false
    }

})