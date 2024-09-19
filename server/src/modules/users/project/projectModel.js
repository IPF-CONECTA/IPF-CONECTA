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
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM(
      "Comenzando",
      "Pendiente",
      "En progreso",
      "Finalizado"
    ),
    allowNull: true,
  },
  projectLink: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  projectLogo: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "https://cdn-icons-png.flaticon.com/512/1540/1540251.png",
  },
});
