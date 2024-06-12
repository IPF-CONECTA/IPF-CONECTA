import { sequelize, DataTypes } from '../../config/db.js'


export const Company = sequelize.define('Company', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    company_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    industry: {
        type: DataTypes.INTEGER
    },
    address: {
        type: DataTypes.UUID,
    },
    logo_url: {
        type: DataTypes.STRING(255)
    },
    cantEmployees: {
        type: DataTypes.INTEGER
    },
    is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {
    timestamps: true
});

module.exports = Company;