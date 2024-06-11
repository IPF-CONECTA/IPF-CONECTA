import { DataTypes, sequelize } from "../../config/db.js";


export const ReportReason = sequelize.define('reportReason', {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER(2)
    },
    reason: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true
    },
    severity: {
        type: DataTypes.INTEGER(2),
        allowNull: false
    }
})