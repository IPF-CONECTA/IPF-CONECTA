import { sequelize, DataTypes } from "../../config/db.js";

export const Idea = sequelize.define("idea", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  title: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  profileId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING(64),
    allowNull: false,
    defaultValue: "active",
  },
  objectives: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  justification: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  technologies: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  complexity: {
    type: DataTypes.STRING(64),
    allowNull: false,
    defaultValue: "media",
  },
  beneficiaries: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});
