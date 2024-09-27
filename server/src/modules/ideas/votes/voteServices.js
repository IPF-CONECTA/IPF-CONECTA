import { Vote } from './voteModel.js';

export const voteSvc = async (id, ideaId) => {
    try {
        const vote = await Vote.findOne({ where: { profileId: id, ideaId } });
        if (vote) {
            await vote.destroy();
            return 1
        }
        await Vote.create({ profileId: id, ideaId });
        return 2
    } catch (error) {
        throw error;
    }
};