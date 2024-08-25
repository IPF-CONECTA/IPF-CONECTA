import { Repost } from "./repostModel.js";

export const repostSvc = async (profileId, postId) => {
    try {
        const isRepost = await Repost.findOne({
            where: {
                profileId,
                postId
            }
        })
        if (!isRepost) {
            const repost = await Repost.create({
                profileId,
                postId
            });
            if (!repost) throw new Error("Hubo un error al compartir esta publicación");
            return repost
        }
        const deletedRepost = await Repost.destroy({
            where: {
                profileId,
                postId
            }
        })
        if (deletedRepost.lenght === 0) throw new Error("Hubo un error al dejar de compartir esta publicación");
        return
    } catch (error) {
        throw new Error(error.message)
    }
}
