import { DataTypes, sequelize } from "../../config/db";


export const TypeJob = sequelize.define('typeJob', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
})