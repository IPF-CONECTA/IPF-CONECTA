import { sequelize, DataTypes } from "../../../config/db.js";

export const Education = sequelize.define("education", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  profileId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  instituteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  disciplineId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});
