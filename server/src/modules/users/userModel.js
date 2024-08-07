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
    title: {
        type: DataTypes.STRING(64),
        allowNull: true
    },
    userStateId: {
        type: DataTypes.INTEGER,// Buscando trabajo / Reclutando / none
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
        defaultValue: 'https://th.bing.com/th/id/R.8e2c571ff125b3531705198a15d3103c?rik=gzhbzBpXBa%2bxMA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-big-image-png-2240.png&ehk=VeWsrun%2fvDy5QDv2Z6Xm8XnIMXyeaz2fhR3AgxlvxAc%3d&risl=&pid=ImgRaw&r=0'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    verifyCode: {
        type: DataTypes.INTEGER,
        defaultValue: generateVerificationCode(),
        allowNull: true
    },
    verified: {
        type: DataTypes.BOOLEAN(),
        defaultValue: false
    }

})