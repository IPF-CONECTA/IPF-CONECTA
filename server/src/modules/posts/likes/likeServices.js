import { Like } from "../../likes/likeModel.js"

export const likeSvc = async (userId, postId) => {
    try {
        const like = await Like.create({
            userId,
            postId
        })
        if (!like) throw new Error("Error al dar like")
        return like
    } catch (error) {
        console.log(error)
        return error.message
    }
}