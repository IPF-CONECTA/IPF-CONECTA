import { Sequelize } from "sequelize-typescript";
import { Dialect } from "sequelize/types";
import User from "../models/users.model";
import Role from "../models/roles.model";
import Post from "../models/posts.model";
import Like from "../models/likes.model";
import Following from "../models/followings.model";
import Forum from "../models/forums.model";
import Social from "../models/socials.model";
import SocialNetwork from "../models/socialNetworks.model";

export const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  dialect: process.env.DB_DIALECT as Dialect,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  models: [User, Role, Post, Like, Following, Forum, Social, SocialNetwork],
});

export function databaseConnection() {
  try {
    sequelize.sync({ force: true });
    sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
