import { sequelize, DataTypes } from "../../config/db.js"

export const LangLevel = sequelize.define('langLevel', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    level: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    timestamps: false

}
)

export const createLangLevels = async () => {
    await LangLevel.bulkCreate([
        { level: 'básico' },
        { level: 'básico limitada' },
        { level: 'básico profesional' },
        { level: 'básico profesional completo' },
        { level: 'bilingüe o nativo' },
    ])
}