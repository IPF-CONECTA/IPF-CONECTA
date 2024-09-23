import { sequelize, DataTypes } from "../../../config/db.js";
import { User } from "../userModel.js";
export const SkillsUser = sequelize.define('skillsUser', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    skillId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
})
SkillsUser.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(SkillsUser, { foreignKey: 'userId' });
