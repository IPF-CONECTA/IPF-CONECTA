import { DataTypes, sequelize } from "../../../../config/db.js";

export const Modality = sequelize.define('modality', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

export const createModalities = async () => {
    await Modality.bulkCreate([
        { name: 'Presencial' },
        { name: 'Remoto' },
        { name: 'Hibrido' },
    ])
}
