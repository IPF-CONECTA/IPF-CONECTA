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
    openToWork: {
        type: DataTypes.BOOLEAN(),
        defaultValue: false,
    }
})