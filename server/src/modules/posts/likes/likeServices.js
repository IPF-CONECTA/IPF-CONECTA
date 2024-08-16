import { Like } from "./likeModel.js";

export const likeSvc = async (userId, postId) => {
    try {
        const existingLike = await Like.findOne({
            where: {
                userId: userId,
                postId: postId
            }
        })
        if (existingLike) {
            await existingLike.destroy()
            return
        }
        const like = await Like.create({
            userId: userId,
            postId: postId
        })
        if (!like) throw new Error("Error al dar like")
        console.log(like)
        return like
    } catch (error) {
        console.log(error)
        return error.message
    }
}