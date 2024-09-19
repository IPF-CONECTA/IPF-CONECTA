import { sequelize, DataTypes } from "../../../config/db.js";

export const Project = sequelize.define("projects", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  profileId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  projectLink: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  projectLogo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
