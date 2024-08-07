import { Attachment } from "./postAttachment/attachmentModel.js"
import { Post } from "./postModel.js"
import { User } from "../users/userModel.js"

export const getPostsSvc = async (page) => {
    try {
        const posts = await Post.findAndCountAll({
            limit: 10,
            order: [['createdAt', 'DESC']],
            offset: page * 10,
            include: [{
                model: User,
                attributes: ['id', 'profilePic', 'names', 'surnames']
            },
            {
                model: Attachment,
                as: 'attachments',
                attributes: ['url', 'type']
            }
            ]
        })
        console.log(posts)
        return posts
    } catch (error) {
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