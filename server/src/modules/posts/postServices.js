import { Attachment } from "./postAttachment/attachmentModel.js"
import { Post } from "./postModel.js"
import { User } from "../users/userModel.js"
import { Like } from "../posts/likes/likeModel.js"
import { Repost } from "./reposts/repostModel.js"

export const getPostsSvc = async (page, userId) => {
    try {
        let data = await Post.findAndCountAll({
            limit: 10,
            offset: page * 10,
            order: [['createdAt', 'DESC']],
            include: [{
                model: User,
                as: 'user',
                attributes: ['id', 'profilePic', 'names', 'surnames']
            },
            {
                model: Attachment,
                as: 'attachments',
                attributes: ['url', 'type']
            },
            {
                model: Like,
                as: 'likes',
                attributes: ['id', 'userId'],
            },
            {
                model: Repost,
                as: 'reposts',
                attributes: ['id', 'userId'],
            },
            {
                model: Post,
                as: 'comments',
                attributes: ['id', 'content', 'createdAt', 'userId'],
                limit: 2,
                include: [{
                    model: User,
                    as: 'user',
                    attributes: ['id', 'profilePic', 'names', 'surnames']
                }]
            },

            ],
        })
        data.rows.map(post => {
            post.dataValues.liked = post.dataValues.likes.some(like => like.dataValues.userId === userId);
            post.dataValues.reposted = post.dataValues.reposts.some(repost => repost.dataValues.userId === userId);
        })
        return { count: data.count, rows: data.rows }
    } catch (error) {
        console.log(error)
        return error.message
    }
}

export const createPostSvc = async (body, userId) => {
    try {
        const post = await Post.create({
            userId: userId,
            content: body.content,
            forumId: body.forumId ? body.forumId : null,
            postId: body.postId ? body.postId : null,
        })
        if (body.attachments) {
            for (let i = 0; i < body.attachments.length; i++) {
                await Attachment.create({
                    postId: post.id,
                    url: body.attachments[i]
                })
            }
        }
        return post
    } catch (error) {
        throw new Error(error.message)
    }
}