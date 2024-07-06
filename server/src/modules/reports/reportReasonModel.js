import { DataTypes, sequelize } from "../../config/db.js";


export const ReportReason = sequelize.define('reportReason', {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    reason: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true
    },
    severity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
    {
        timestamps: false
    }
)

export const createReportReasons = async () => {
    try {
        await ReportReason.bulkCreate([
            { reason: 'Explotación infantil', severity: 10 },
            { reason: 'Amenazas o violencia', severity: 9 },
            { reason: 'Organizaciones extremistas o peligrosas', severity: 9 },
            { reason: 'Incitación al odio', severity: 8 },
            { reason: 'Contenido sexual', severity: 8 },
            { reason: 'Fraude o estafa', severity: 8 },
            { reason: 'Acoso', severity: 7 },
            { reason: 'Autolesiones', severity: 7 },
            { reason: 'Productos y servicios ilegales', severity: 7 },
            { reason: 'Contenido explícito', severity: 6 },
            { reason: 'Desinformación', severity: 3 },
            { reason: 'Mensaje no deseado (spam)', severity: 3 },
            { reason: 'Cuenta falsa', severity: 3 },
            { reason: 'Infracción', severity: 2 },
        ])
    } catch (error) {
        console.error('Failed to import report reasons:', error);
    }
}