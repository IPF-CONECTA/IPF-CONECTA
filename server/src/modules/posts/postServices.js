import { Attachment } from "../attachment/attachmentModel.js"
import { Post } from "./postModel.js"
import { User } from "../users/userModel.js"
import { Like } from "../posts/likes/likeModel.js"
import { Repost } from "./reposts/repostModel.js"
import { Profile } from "../profile/profileModel.js"

export const getPostsSvc = async (page, id) => {
    const profile = await Profile.findByPk(id)
    try {
        let data = await Post.findAndCountAll({
            limit: 10,
            offset: page * 10,
            where: {
                postId: null
            },
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: Profile,
                    attributes: ['id', 'names', 'surnames', 'profilePic', 'title'],
                    as: 'profile',
                    include: {
                        model: User,
                        attributes: ['email', 'username']
                    }
                },
                {
                    model: Like,
                    as: 'likes',
                    attributes: ['id', 'profileId'],
                },
                {
                    model: Repost,
                    as: 'reposts',
                    attributes: ['id', 'profileId'],
                },
                {
                    model: Post,
                    as: 'comments',
                    attributes: ['id', 'content', 'createdAt', 'profileId'],
                    include: {
                        model: Profile,
                        attributes: ['id', 'names', 'surnames', 'profilePic'],
                        as: 'profile',
                    }
                },

            ],
        })
        data.rows.map(post => {
            post.dataValues.liked = post.dataValues.likes.some(like => like.dataValues.profileId === profile.id);
            post.dataValues.reposted = post.dataValues.reposts.some(repost => repost.dataValues.profileId === profile.id);
        })
        return { count: data.count, rows: data.rows }
    } catch (error) {
        console.log(error)
        return error.message
    }
}

export const createPostSvc = async (post, profileId) => {
    try {
        const createdPost = await Post.create({
            profileId: profileId,
            content: post.content,
            forumId: post.forumId ? post.forumId : null,
            postId: post.postId ? post.postId : null,
        })
        if (post.attachments) {
            for (let i = 0; i < post.attachments.length; i++) {
                await Attachment.create({
                    postId: post.id,
                    url: post.attachments[i]
                })
            }
        }
        return createdPost
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getPostByIdSvc = async (postId, profileId) => {
    try {
        const profile = await Profile.findByPk(profileId);

        const post = await Post.findByPk(postId, {
            include: [
                {
                    model: Profile,
                    attributes: ['id', 'names', 'surnames', 'profilePic', 'title'],
                    as: 'profile',
                    include: {
                        model: User,
                        attributes: ['email', 'username']
                    }
                },
                {
                    model: Like,
                    as: 'likes',
                    attributes: ['id', 'profileId'],
                },
                {
                    model: Repost,
                    as: 'reposts',
                    attributes: ['id', 'profileId'],
                },
                {
                    model: Post,
                    as: 'parentPost',
                    attributes: ['id', 'content', 'createdAt', 'profileId', 'postId'],
                    include: [
                        {
                            model: Profile,
                            attributes: ['id', 'names', 'surnames', 'profilePic'],
                            as: 'profile',
                            include: {
                                model: User,
                                attributes: ['email', 'username']
                            }
                        },
                        {
                            model: Like,
                            as: 'likes',
                            attributes: ['id', 'profileId'],
                        },
                        {
                            model: Repost,
                            as: 'reposts',
                            attributes: ['id', 'profileId'],
                        },
                    ]
                },
                {
                    model: Post,
                    as: 'comments',
                    attributes: ['id', 'content', 'createdAt', 'profileId', 'postId'],
                    include: [
                        {
                            model: Profile,
                            attributes: ['id', 'names', 'surnames', 'profilePic'],
                            as: 'profile',
                            include: {
                                model: User,
                                attributes: ['email', 'username']
                            }
                        },
                        {
                            model: Like,
                            as: 'likes',
                            attributes: ['id', 'profileId'],
                        },
                        {
                            model: Repost,
                            as: 'reposts',
                            attributes: ['id', 'profileId'],
                        },
                        {
                            model: Post,
                            as: 'comments',
                            include: [
                                {
                                    model: Profile,
                                    attributes: ['id', 'names', 'surnames', 'profilePic'],
                                    as: 'profile',
                                    include: {
                                        model: User,
                                        attributes: ['email', 'username']
                                    }
                                },
                                {
                                    model: Like,
                                    as: 'likes',
                                    attributes: ['id', 'profileId'],
                                },
                                {
                                    model: Repost,
                                    as: 'reposts',
                                    attributes: ['id', 'profileId'],
                                }
                            ]
                        }
                    ]
                },

            ]
        });

        post.comments.map(post => {
            post.dataValues.liked = post.dataValues.likes.some(like => like.dataValues.profileId === profile.id);
            post.dataValues.reposted = post.dataValues.reposts.some(repost => repost.dataValues.profileId === profile.id);
        });
        post.dataValues.liked = post.dataValues.likes.some(like => like.dataValues.profileId === profile.id);
        post.dataValues.reposted = post.dataValues.reposts.some(repost => repost.dataValues.profileId === profile.id);

        return post;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getAsweredPosts = async (postId) => {
    try {
        const posts = await Post.findByPk(postId, {
            include: {

            }
        })
    } catch (error) {

    }
}