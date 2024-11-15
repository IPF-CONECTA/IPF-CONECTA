import { sequelize, DataTypes } from "../../../../config/db.js";
import { disciplines } from "./discipline.data.js";

export const Discipline = sequelize.define(
  "discipline",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
export const createDiciplines = async () => {
  try {
    await Discipline.sync({ force: true });
    await Discipline.bulkCreate(disciplines);
  } catch (error) {
    console.error("Failed to import langs:", error);
  }
};
