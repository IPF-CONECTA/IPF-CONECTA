import { Op } from "sequelize";

import { Job } from "../recruiters/job/jobModel.js";
import { User } from "../users/userModel.js";
import { Post } from "../posts/postModel.js";
import { Experience } from "../profile/experiences/experiencesModel.js";

import { getMonth } from "../../helpers/getTime.js";
import { BASIC_ROLES } from "../../constant/roles.js";
import { getSkillablesByIds } from "../skills/skillable/skillableServices.js";

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
    throw error
  }
};

export const recruitedByMonth = async () => {
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
    throw error
  }
};

export const recruitedUsers = async () => {
  try {
    const cantRecruited = await Experience.count({
      where: {
        isRecruited: true,
      }
    })
    return cantRecruited
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getNewUsers = async () => {
  try {
    const users = await User.findAll({
      where: {
        [Op.or]: [
          { roleId: BASIC_ROLES.recruiter },
          { roleId: BASIC_ROLES.student },
        ],

        createdAt: { [Op.gte]: new Date(`${new Date().getFullYear()}-01-01`) },
      },
      attributes: ["createdAt"],
    });

    const usersByMonth = Array(12).fill(0);

    users.forEach(user => {
      const month = new Date(user.createdAt).getMonth(); // Obtener el mes (0-11)
      usersByMonth[month] += 1;
    });

    return usersByMonth;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPostsByMonth = async () => {
  try {
    const posts = await Post.findAll({
      where: {
        createdAt: { [Op.gte]: new Date(`${new Date().getFullYear()}-01-01`) },
      },
      attributes: ["createdAt"],
    });

    const postsByMonth = Array(12).fill(0);

    posts.forEach(post => {
      const month = new Date(post.createdAt).getMonth(); // Obtener el mes (0-11)
      postsByMonth[month] += 1;
    });

    return postsByMonth;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPosts = async () => {
  try {
    const posts = await Post.count()
    return posts
  } catch (error) {
    console.log(error)
    throw error

  }
}

export const getActiveJobsSvc = async () => {
  try {
    const jobs = await Job.findAndCountAll({
      where: {
        active: true,
      },
    });

    return jobs.count;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
