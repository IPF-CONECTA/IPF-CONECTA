import { DataTypes, sequelize } from "../../../config/db.js";

export const Association = sequelize.define('association', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    companyId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    message: { // MENSAJE QUE EL RECRUITER ENVIA PARA JUSTIFICAR LA ASOCIACION
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Pendiente', 'Aprobada', 'Rechazada'),
        allowNull: false,
        defaultValue: 'Pendiente'
    },
    justification: { // JUSTIFICACION DEL ADMINISTRADOR SI LA ASOCIACION ES RECHAZADA
        type: DataTypes.STRING(255),
        allowNull: true
    }
})