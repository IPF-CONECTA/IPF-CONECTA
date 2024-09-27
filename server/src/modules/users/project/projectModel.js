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
  smallDescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(
      "Comenzando",
      "Pendiente",
      "En progreso",
      "Finalizado"
    ),
    allowNull: false,
  },
  projectLink: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  projectLogo: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: "https://img.freepik.com/free-vector/quality-work-abstract-concept-vector-illustration-quality-workplace-employee-performance-experienced-worker-speed-production-improvement-effective-management-abstract-metaphor_335657-6296.jpg?t=st=1727185393~exp=1727188993~hmac=41c14b78504a7fd10486a2240db382cc6a31a6d37d42b7d3d9e36fd16daecbbb&w=740",
  },
  privacity: {
    type: DataTypes.ENUM("publico", "privado"),
    allowNull: false,
    defaultValue: "publico",
  },
});
