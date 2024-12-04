import { sequelize } from "../../config/db.js";
import { Idea } from "./ideaModel.js";
import { Vote } from "./votes/voteModel.js";
import { Profile } from "../profile/profileModel.js";
import { User } from "../users/userModel.js";
import {
  createAttachmentsSvc,
  getAttachmentsSvc,
} from "../attachment/attachmentServices.js";

export const addIdeaSvc = async (idea, id, files) => {
  try {
    const ideaData = {
      title: idea.title,
      description: idea.description,
      category: idea.category,
      profileId: id,
      objectives: idea.objectives,
      justification: idea.justification,
      technologies: idea.technologies,
      complexity: idea.complexity,
      beneficiaries: idea.beneficiaries,
    };
    const createdIdea = await Idea.create(ideaData);

    // Asociar archivos adjuntos a la idea
    if (files && files.length > 0) {
      await createAttachmentsSvc(createdIdea.id, files, "idea");
    }

    return createdIdea;
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
          as: "votes",
          attributes: ["id", "profileId"],
        },
        {
          model: Profile,
          attributes: ["id", "names", "surnames", "profilePic"],
          include: {
            model: User,
            attributes: ["username"],
          },
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
            "totalVotes",
          ],
        ],
      },
      order: [["createdAt", "DESC"]],
    });
    if (!id) {
      return ideas;
    }
    ideas.map((idea) => {
      idea.dataValues.liked = idea.dataValues.votes.some(
        (vote) => vote.dataValues.profileId === id
      );
    });
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
          as: "votes",
          attributes: ["id", "profileId"],
        },
        {
          model: Profile,
          attributes: ["id", "names", "surnames", "profilePic"],
          include: {
            model: User,
            attributes: ["username"],
          },
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
            "totalVotes",
          ],
        ],
      },
      order: [
        [
          sequelize.literal(`(
                SELECT COUNT(*)
                FROM votes AS vote
                WHERE
                    vote."ideaId" = "idea"."id"
            )`),
          "DESC",
        ],
      ],
    });
    if (!id) {
      return ideas;
    }
    ideas.map((idea) => {
      idea.dataValues.liked = idea.dataValues.votes.some(
        (vote) => vote.dataValues.profileId === id
      );
    });
    return ideas;
  } catch (error) {
    throw error;
  }
};
export const getIdeaByIdSvc = async (id) => {
  try {
    const idea = await Idea.findByPk(id, {
      include: [
        {
          model: Vote,
          as: "votes",
          attributes: ["id", "profileId"],
        },
        {
          model: Profile,
          attributes: ["id", "names", "surnames", "profilePic"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });

    if (!idea) throw new Error("Idea no encontrada");

    // Obtener archivos adjuntos
    const attachments = await getAttachmentsSvc(idea.id);
    idea.dataValues.attachments = attachments;

    return idea;
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
