import {
  skillsTrendSvc,
  recruitedByIPFC,
  getNewUsers,
  getPostsByMonth,
} from "./statisticsServices.js";

export const skillsTrendCtrl = async (_req, res) => {
  try {
    const skills = await skillsTrendSvc();
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const jobsObteniedCtrl = async (_req, res) => {
  try {
    const jobs = await recruitedByIPFC();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNewUsersCtrl = async (_req, res) => {
  try {
    const users = await getNewUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostsByMonthCtrl = async (_req, res) => {
  try {
    const posts = await getPostsByMonth();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
