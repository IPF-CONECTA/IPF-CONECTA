import { sequelize, DataTypes } from "../../config/db.js";

export const Role = sequelize.define('role', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(10),
        allowNull: false
    }

}, {
    timestamps: false
}

)

export const createRoles = async () => {
    try {
        await Role.bulkCreate([
            { name: 'superAdmin' },
            { name: 'admin' },
            { name: 'student' },
            { name: 'recruiter' },
            { name: 'investor' }
        ])
    } catch (error) {
        console.error('Failed to import roles:', error);
    }
}