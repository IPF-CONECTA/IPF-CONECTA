import { Router } from "express";
import {
    createIdea,
    getIdeas,
    getIdeaDetails,
    updateIdea,
    deleteIdea,
    getIdeasOBVotes,
} from "./ideaControllers.js";
import { isToken } from "../../middlewares/jwt/isVerifiedAccount.js";

const ideaRoutes = Router();

ideaRoutes.post("/idea", isToken, createIdea);
ideaRoutes.get("/ideasLogged", isToken, getIdeas);
ideaRoutes.get("/ideas", getIdeas);
ideaRoutes.get("/ideasByVotes", getIdeasOBVotes);
ideaRoutes.get("/ideasByVotesLogged", isToken, getIdeasOBVotes);
ideaRoutes.get("/idea/:id", isToken, getIdeaDetails);
ideaRoutes.put("/idea/:id", isToken, updateIdea);
ideaRoutes.delete("/idea/:id", isToken, deleteIdea);

export default ideaRoutes;