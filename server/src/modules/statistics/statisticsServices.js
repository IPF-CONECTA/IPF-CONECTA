import { Op } from "sequelize";
import { sequelize } from "../../config/db.js";
import { Job } from "../recruiters/job/jobModel.js";
import { Experience } from "../profile/experiences/experiencesModel.js";
import { getSkillablesByIds } from "../skills/skillable/skillableServices.js";
import { getMonth } from "../../helpers/getTime.js";
import { User } from "../users/userModel.js";
import { BASIC_ROLES } from "../../constant/roles.js";
import { Post } from "../posts/postModel.js";

export const skillsTrendSvc = async () => {
  try {
    const jobs = await Job.findAll({
      attributes: ["id"],
    });
    const jobIds = jobs.map((job) => job.id);
    const skills = await getSkillablesByIds(jobIds);

    const countSkills = skills.reduce((acc, [skillName, skillData]) => {
      acc[skillName] = skillData.length;
      return acc;
    }, {});

    const sortedSkills = Object.entries(countSkills)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .reduce((acc, [skillName, count]) => {
        acc[skillName] = count;
        return acc;
      }, {});

    return sortedSkills;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const recruitedByIPFC = async () => {
  try {
    const experiencies = await Experience.findAndCountAll({
      where: {
        isRecruited: true,
        startDate: {
          [Op.gte]: new Date(`${new Date().getFullYear()}-01-01`),
        },
      },
      attributes: ["startDate"],
    });

    const expByMonth = experiencies.rows.reduce((acc, exp) => {
      const month = getMonth(exp.startDate);
      acc[month] = acc[month] ? acc[month] + 1 : 1;
      return acc;
    }, {});

    return expByMonth;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getNewUsers = async () => {
  try {
    const users = await User.findAndCountAll({
      where: {
        [Op.or]: [
          { roleId: BASIC_ROLES.recruiter },
          { roleId: BASIC_ROLES.student },
        ],

        createdAt: { [Op.gte]: new Date(`${new Date().getFullYear()}-01-01`) },
      },
      attributes: ["createdAt"],
    });

    const orderUsers = users.rows.reduce((acc, user) => {
      const month = getMonth(user.createdAt);
      acc[month] = acc[month] ? acc[month] + 1 : 1;
      return acc;
    }, {});

    return orderUsers;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPostsByMonth = async () => {
  try {
    const posts = await Post.findAndCountAll({
      where: {
        createdAt: { [Op.gte]: new Date(`${new Date().getFullYear()}-01-01`) },
      },
      attributes: ["createdAt"],
    });

    const orderPosts = posts.rows.reduce((acc, post) => {
      const month = getMonth(post.createdAt);
      acc[month] = acc[month] ? acc[month] + 1 : 1;
      return acc;
    }, {});

    return orderPosts;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
