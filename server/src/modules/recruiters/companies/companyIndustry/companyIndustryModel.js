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
        { name: 'Aeroespacial' },
        { name: 'Agricultura, Silvicultura, Pesca y Caza' },
        { name: 'Alimentos y Bebidas' },
        { name: 'Arte, Entretenimiento y Recreación' },
        { name: 'Automotriz' },
        { name: 'Biotecnología' },
        { name: 'Comercio Mayorista y Minorista' },
        { name: 'Construcción' },
        { name: 'Educación' },
        { name: 'Energía' },
        { name: 'Farmacéutica' },
        { name: 'Finanzas' },
        { name: 'Finanzas y Seguros' },
        { name: 'Hospitalidad y Turismo' },
        { name: 'Industria Manufacturera' },
        { name: 'Información y Comunicaciones' },
        { name: 'Inmobiliarias y Servicios de Alquiler' },
        { name: 'IT' },
        { name: 'Logística y Transporte' },
        { name: 'Marketing' },
        { name: 'Media' },
        { name: 'Medios de Comunicación y Entretenimiento' },
        { name: 'Minería y Metales' },
        { name: 'Petróleo y Gas' },
        { name: 'Productos de Consumo' },
        { name: 'Salud' },
        { name: 'Servicios de Alojamiento y Alimentación' },
        { name: 'Servicios Médicos' },
        { name: 'Servicios Profesionales, Científicos y Técnicos' },
        { name: 'Tecnología de la Información y Telecomunicaciones' },
        { name: 'Textil y Vestimenta' },
        { name: 'Transporte y Almacenamiento' }

    ])
}