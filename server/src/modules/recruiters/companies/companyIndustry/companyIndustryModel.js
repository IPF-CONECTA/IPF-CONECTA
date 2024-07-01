import { sequelize, DataTypes } from "../../../../config/db.js";

export const CompanyIndustry = sequelize.define('companyIndustry', {
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

export const createCompanyIndustry = async () => {
    // await CompanyIndustry.sync({ force: true })
    await CompanyIndustry.bulkCreate([
        { name: 'Administración Pública y Defensa' },
        { name: 'Agricultura, Silvicultura, Pesca y Caza' },
        { name: 'Arte, Entretenimiento y Recreación' },
        { name: 'Comercio Mayorista y Minorista' },
        { name: 'Construcción' },
        { name: 'Educacion' },
        { name: 'Energía' },
        { name: 'Financas' },
        { name: 'Finanzas y Seguros' },
        { name: 'Industria Manufacturera' },
        { name: 'Información y Comunicaciones' },
        { name: 'Inmobiliarias y Servicios de Alquiler' },
        { name: 'IT' },
        { name: 'Marketing' },
        { name: 'Media' },
        { name: 'Salud' },
        { name: 'Servicios de Alojamiento y Alimentación' },
        { name: 'Servicios Profesionales, Científicos y Técnicos' },
        { name: 'Transporte y Almacenamiento' },
        { name: 'Otros' },
    ])
}