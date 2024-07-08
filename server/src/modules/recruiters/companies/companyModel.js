import { sequelize, DataTypes } from '../../../config/db.js'


export const Company = sequelize.define('company', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    industryId: {
        type: DataTypes.INTEGER
    },
    cityId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    logoUrl: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'https://th.bing.com/th/id/OIP.tu5yvoyO5oYFWYzLVOf-BwHaHa?rs=1&pid=ImgDetMain'
    },
    cantEmployees: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.ENUM('Pendiente', 'Aprobada', 'Rechazada'),
        defaultValue: 'Pendiente'
    },
    justification: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    timestamps: true
});

