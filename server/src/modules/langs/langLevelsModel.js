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
        { level: 'A1' },
        { level: 'A2' },
        { level: 'B1' },
        { level: 'B2' },
        { level: 'C1' },
        { level: 'C2' }
    ])
}