import {
  getNewUsers,
  skillsTrendSvc,
  recruitedByMonth,
  getPostsByMonth,
  getActiveJobsSvc,
  recruitedUsers,
  getPosts,
} from "./statisticsServices.js";

export const skillsTrendCtrl = async (_req, res) => {
  try {
    const skills = await skillsTrendSvc();
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const recruitedUsersByMonthCtrl = async (_req, res) => {
  try {
    const jobs = await recruitedByMonth();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const recruitedUsersCtrl = async (_req, res) => {
  try {
    const recruited = await recruitedUsers();
    res.status(200).json(recruited);
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
export const getPostsCtrl = async (_req, res) => {
  try {
    const posts = await getPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getActiveJobsCtrl = async (_req, res) => {
  try {
    const jobs = await getActiveJobsSvc();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
