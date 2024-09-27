import { sequelize } from "../../config/db.js";
import { Idea } from "./ideaModel.js";
import { Vote } from "./votes/voteModel.js";

export const addIdeaSvc = async (idea, id) => {
    try {
        const ideaData = {
            title: idea.title,
            description: idea.description,
            category: idea.category,
            profileId: id
        }
        return await Idea.create(ideaData);
    } catch (error) {
        throw error;
    }
};

export const getIdeasSvc = async (id) => {
    try {
        const ideas = await Idea.findAll({
            include: [
                {
                    model: Vote,
                    as: 'votes',
                    attributes: ['id', 'profileId'],

                },

            ],
            limit: 6,
            attributes: {
                include: [
                    [
                        sequelize.literal(`(
                SELECT COUNT(*)
                FROM votes AS vote
                WHERE
                    vote."ideaId" = "idea"."id"
            )`),
                        'totalVotes'
                    ]
                ]
            },
            order: [['createdAt', 'DESC']]

        })
        if (!id) {
            return ideas
        }
        ideas.map(idea => {
            idea.dataValues.liked = idea.dataValues.votes.some(vote => vote.dataValues.profileId === id);
        })
        return ideas;
    } catch (error) {
        throw error;
    }
};
export const getIdeasOrderByVotesSvc = async (id) => {
    try {
        const ideas = await Idea.findAll({
            include: [
                {
                    model: Vote,
                    as: 'votes',
                    attributes: ['id', 'profileId'],
                },
            ],
            limit: 3,
            attributes: {
                include: [
                    [
                        sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM votes AS vote
                            WHERE
                                vote."ideaId" = "idea"."id"
                        )`),
                        'totalVotes'
                    ]
                ]
            },
            order: [[sequelize.literal(`(
                SELECT COUNT(*)
                FROM votes AS vote
                WHERE
                    vote."ideaId" = "idea"."id"
            )`), 'DESC']]
        });
        if (!id) {
            return ideas;
        }
        ideas.map(idea => {
            idea.dataValues.liked = idea.dataValues.votes.some(vote => vote.dataValues.profileId === id);
        });
        return ideas;
    } catch (error) {
        throw error;
    }
};
export const getIdeaByIdSvc = async (id) => {
    try {
        return await Idea.findByPk(id);
    } catch (error) {
        throw error;
    }
};

export const updateIdeaSvc = async (id, idea) => {
    try {
        const [rows] = await Idea.update(idea, {
            where: { id },
        });
        return rows;
    } catch (error) {
        throw error;
    }
};

export const deleteIdeaSvc = async (id) => {
    try {
        const idea = await Idea.findByPk(id);
        await idea.destroy();
        return idea;
    } catch (error) {
        throw error;
    }
};