import { DataTypes, sequelize } from "../../../../config/db.js";

export const CompanyUbication = sequelize.define("companyUbication", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  companyId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  countryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stateId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  cityId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
});
