import { DataTypes, sequelize } from "../../../../config/db.js";


export const ContractType = sequelize.define('contractType', { // TIEMPO COMPLETO / MEDIO TIEMPO / FREELANCE / ETC
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: false

})

export const createContractTypes = async () => {
    try {
        await ContractType.bulkCreate([
            { name: 'Jornada completa' },
            { name: 'Media jornada' },
            { name: 'Por horas' },
            { name: 'Por proyecto' },
            { name: 'Temporal' },
            { name: 'Freelance' },
            { name: 'Voluntariado' },
            { name: 'Prácticas' },
            { name: 'Otro' },
        ])
        console.log('ContractTypes imported successfully.');
    } catch (error) {
        console.error('Failed to import ContractTypes:', error);
    }
}