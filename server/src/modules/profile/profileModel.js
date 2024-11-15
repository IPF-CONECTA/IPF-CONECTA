import { sequelize, DataTypes } from "../../config/db.js";

export const Profile = sequelize.define('profile', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    userId: {
        type: DataTypes.UUID,
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
    birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    phoneareacode: {
        type: DataTypes.STRING(4),
        allowNull: true
    },
    phonenumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    title: {
        type: DataTypes.STRING(64),
        allowNull: true
    },
    userStateId: {
        type: DataTypes.INTEGER,// Buscando trabajo / Reclutando / none
        defaultValue: 1,
        allowNull: false,
    },
    about: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    profilePic: {
        type: DataTypes.STRING(),
        allowNull: false,
        defaultValue: 'defaultPfp.jpg'
    },
    bannerPic: {
        type: DataTypes.STRING(),
        allowNull: false,
        defaultValue: 'defaultBanner.jpg'
    },
})
