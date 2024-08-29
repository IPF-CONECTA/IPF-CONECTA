import { Like } from "./likeModel.js";

export const likeSvc = async (profileId, postId) => {
    try {
        const existingLike = await Like.findOne({
            where: {
                profileId,
                postId
            }
        })
        if (existingLike) {
            await existingLike.destroy()
            return
        }
        const like = await Like.create({
            profileId,
            postId
        })
        if (!like) throw new Error("Error al dar like")
        return like
    } catch (error) {
        return error.message
    }
}