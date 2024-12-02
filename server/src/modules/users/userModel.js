import { sequelize, DataTypes } from '../../config/db.js'
import { generateVerificationCode } from '../../helpers/generateCode.js'

export const User = sequelize.define('user', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    roleId: {
        type: DataTypes.UUID,
        allowNull: false
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
    },
    banned: {
        type: DataTypes.BOOLEAN(),
        defaultValue: false
    },
    suspensionExpires: {
        type: DataTypes.DATE,
        allowNull: true
    }

})


