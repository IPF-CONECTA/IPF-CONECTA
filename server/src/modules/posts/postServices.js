import { Attachment } from "../attachment/attachmentModel.js";
import { Post } from "./postModel.js";
import { User } from "../users/userModel.js";
import { Like } from "../posts/likes/likeModel.js";
import { Repost } from "./reposts/repostModel.js";
import { Profile } from "../profile/profileModel.js";
import {
  createAttachmentsSvc,
  getAttachmentsSvc,
} from "../attachment/attachmentServices.js";
import { sequelize } from "../../config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import { getProfileIdByUsername } from "../users/userServices.js";
import { ALL_ROLES } from "../../constant/roles.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getPostsSvc = async (page, id) => {
  const profile = await Profile.findByPk(id);
  try {
    let data = await Post.findAndCountAll({
      limit: 10,
      offset: page * 10,
      where: {
        postId: null,
      },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Profile,
          attributes: ["id", "names", "surnames", "profilePic", "title"],
          as: "profile",
          include: {
            model: User,
            attributes: ["email", "username"],
          },
        },
        {
          model: Like,
          as: "likes",
          attributes: ["id", "profileId"],
        },
        {
          model: Repost,
          as: "reposts",
          attributes: ["id", "profileId"],
        },
        {
          model: Post,
          as: "comments",
          attributes: ["id", "content", "createdAt", "profileId"],
          include: {
            model: Profile,
            attributes: ["id", "names", "surnames", "profilePic"],
            as: "profile",
          },
        },
      ],
    });
    await Promise.all(
      data.rows.map(async (post) => {
        post.dataValues.own = post.dataValues.profileId === profile.id;
        post.dataValues.attachments = await getAttachmentsSvc(post.id);
        post.dataValues.liked = post.dataValues.likes.some(
          (like) => like.dataValues.profileId === profile.id
        );
        post.dataValues.reposted = post.dataValues.reposts.some(
          (repost) => repost.dataValues.profileId === profile.id
        );
      })
    );
    return { count: data.count, rows: data.rows };
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

export const createPostSvc = async (post, files, profileId) => {
  const t = await sequelize.transaction();
  try {
    const createdPost = await Post.create(
      {
        profileId: profileId,
        content: post.content,
        forumId: post.forumId ? post.forumId : null,
        postId: post.postId ? post.postId : null,
      },
      {
        transaction: t,
      }
    );
    await createAttachmentsSvc(createdPost.id, files, "post", t);
    await t.commit();
    return createdPost;
  } catch (error) {
    await t.rollback();
    throw new Error(error.message);
  }
};

export const getPostByIdSvc = async (postId, profileId) => {
  try {
    const profile = await Profile.findByPk(profileId);

    const post = await Post.findByPk(postId, {
      include: [
        {
          model: Profile,
          attributes: ["id", "names", "surnames", "profilePic", "title"],
          as: "profile",
          include: {
            model: User,
            attributes: ["email", "username"],
          },
        },
        {
          model: Like,
          as: "likes",
          attributes: ["id", "profileId"],
        },
        {
          model: Repost,
          as: "reposts",
          attributes: ["id", "profileId"],
        },
        {
          model: Post,
          as: "parentPost",
          attributes: ["id", "content", "createdAt", "profileId", "postId"],
          include: [
            {
              model: Profile,
              attributes: ["id", "names", "surnames", "profilePic"],
              as: "profile",
              include: {
                model: User,
                attributes: ["email", "username"],
              },
            },
            {
              model: Like,
              as: "likes",
              attributes: ["id", "profileId"],
            },
            {
              model: Repost,
              as: "reposts",
              attributes: ["id", "profileId"],
            },
          ],
        },
        {
          model: Post,
          as: "comments",
          attributes: ["id", "content", "createdAt", "profileId", "postId"],
          include: [
            {
              model: Profile,
              attributes: ["id", "names", "surnames", "profilePic"],
              as: "profile",
              include: {
                model: User,
                attributes: ["email", "username"],
              },
            },
            {
              model: Like,
              as: "likes",
              attributes: ["id", "profileId"],
            },
            {
              model: Repost,
              as: "reposts",
              attributes: ["id", "profileId"],
            },
            {
              model: Post,
              as: "comments",
              include: [
                {
                  model: Profile,
                  attributes: ["id", "names", "surnames", "profilePic"],
                  as: "profile",
                  include: {
                    model: User,
                    attributes: ["email", "username"],
                  },
                },
                {
                  model: Like,
                  as: "likes",
                  attributes: ["id", "profileId"],
                },
                {
                  model: Repost,
                  as: "reposts",
                  attributes: ["id", "profileId"],
                },
              ],
            },
          ],
        },
      ],
    });

    if (profileId) {

      post.comments.map((post) => {
        post.dataValues.own = post.dataValues.profileId === profile.id;
        post.dataValues.liked = post.dataValues.likes.some(
          (like) => like.dataValues.profileId === profile.id
        );
        post.dataValues.reposted = post.dataValues.reposts.some(
          (repost) => repost.dataValues.profileId === profile.id
        );
      });
      post.dataValues.own = post.dataValues.profileId === profile.id;
      post.dataValues.attachments = await getAttachmentsSvc(post.id);
      post.dataValues.liked = post.dataValues.likes.some(
        (like) => like.dataValues.profileId === profile.id
      );
      post.dataValues.reposted = post.dataValues.reposts.some(
        (repost) => repost.dataValues.profileId === profile.id
      );
    }

    return post;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deletePostSvc = async (postId, profileId, role) => {
  const t = await sequelize.transaction();
  try {
    const post = await Post.findByPk(postId, { transaction: t });
    if (!post) throw new Error("Post no encontrado");

    // Obtener los archivos adjuntos del post
    const attachments = await getAttachmentsSvc(postId);

    // Eliminar los archivos del sistema de archivos y base de datos
    await Promise.all(
      attachments.map(async (attachment) => {
        const filePath = path.join(
          __dirname,
          "../../../uploads/images",
          attachment.url
        );
        await Attachment.destroy({
          where: { id: attachment.id },
          transaction: t,
        });
        try {
          await fs.unlink(filePath);
        } catch (error) {
          console.error(`Error al eliminar el archivo ${filePath}:`, error);
        }
      })
    );
    // Eliminar el post
    await post.destroy({ transaction: t });

    await t.commit();
    return { message: "Post eliminado" };
  } catch (error) {
    await t.rollback();
    throw new Error(error.message);
  }
};

export const getPostsByUsernameSvc = async (username, reqUser, page) => {
  try {
    const profileId = await getProfileIdByUsername(username);
    const data = await Post.findAndCountAll({
      limit: 10,
      offset: page * 10,
      where: {
        profileId: profileId,
        postId: null,
      },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Profile,
          attributes: ["id", "names", "surnames", "profilePic", "title"],
          as: "profile",
          include: {
            model: User,
            attributes: ["email", "username"],
          },
        },
        {
          model: Like,
          as: "likes",
          attributes: ["id", "profileId"],
        },
        {
          model: Repost,
          as: "reposts",
          attributes: ["id", "profileId"],
        },
        {
          model: Post,
          as: "comments",
          attributes: ["id", "content", "createdAt", "profileId"],
          include: {
            model: Profile,
            attributes: ["id", "names", "surnames", "profilePic"],
            as: "profile",
          },
        },
      ],
    });
    await Promise.all(
      data.rows.map(async (post) => {
        post.dataValues.own = post.dataValues.profileId === reqUser;
        post.dataValues.attachments = await getAttachmentsSvc(post.id);
        post.dataValues.liked = post.dataValues.likes.some(
          (like) => like.dataValues.profileId === reqUser
        );
        post.dataValues.reposted = post.dataValues.reposts.some(
          (repost) => repost.dataValues.profileId === reqUser
        );
      })
    );
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
