import { sequelize, DataTypes } from '../../config/db.js'
import { generateVerificationCode } from '../../helpers/generateCode.js'

export const User = sequelize.define('user', {
    id: {
        type: DataTypes.STRING(36),
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
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    roleId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    profileId: {
        type: DataTypes.INTEGER(),
        allowNull: true,
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