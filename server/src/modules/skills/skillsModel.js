import { DataTypes, sequelize } from "../../config/db.js";
import skillsData from './skills.json' assert { type: 'json' };

export const Skill = sequelize.define('skill', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(),
        allowNull: false
    }
}, {
    timestamps: false
})

export const createSkills = async () => {
    try {
        await Skill.bulkCreate(skillsData);
        console.log(`${skillsData.length} skills imported successfully.`);
    } catch (error) {
        console.error('Failed to import skills:', error);
    }
}