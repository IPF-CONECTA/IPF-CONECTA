import { Repost } from "./repostModel.js";

export const repostSvc = async (userId, postId) => {
    try {
        const isRepost = await Repost.findOne({
            where: {
                userId,
                postId
            }
        })
        if (!isRepost) {
            const repost = await Repost.create({
                userId,
                postId
            });
            if (!repost) throw new Error("Hubo un error al compartir esta publicación");
        }
        const deletedRepost = await Repost.destroy({
            where: {
                userId,
                postId
            }
        })
        if (deletedRepost.lenght === 0) throw new Error("Hubo un error al dejar de compartir esta publicación");
        return
    } catch (error) {
        throw new Error(error.message)
    }
}
