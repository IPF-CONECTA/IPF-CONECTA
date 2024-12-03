import { sequelize, DataTypes } from "../../../../config/db.js";

export const JobPostulation = sequelize.define("jobPostulation", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  profileId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  jobId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
