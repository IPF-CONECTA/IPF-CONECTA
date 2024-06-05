import { sequelize, DataTypes } from '../config/db.js';
import { Country } from './country.js';
export const State = sequelize.define('state', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
    },
    country_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

},
    {
        timestamps: false
    });

State.belongsTo(Country, {
    foreignKey: 'country_id',
});

