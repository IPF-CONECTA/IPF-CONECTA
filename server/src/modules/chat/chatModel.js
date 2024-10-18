import { sequelize, DataTypes } from "../../config/db.js";

export const Chat = sequelize.define(
  "chats",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    profile1Id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    profile2Id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  { timestamps: true }
);
