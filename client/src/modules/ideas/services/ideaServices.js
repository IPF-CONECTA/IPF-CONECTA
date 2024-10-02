import axios from "axios";
import { authService } from "../../auth/services/authService";

export const getIdeasLogged = async () => {
    try {
        const res = await axios.get("http://localhost:4000/ideasLogged", {
            headers: {
                Authorization: `Bearer ${authService.getToken()}`,
            },
        });

        return { data: res.data, status: res.status };
    } catch (error) {
        return { status: error.status, error: error.response?.data || "Hubo un error al obtener las ideas" };
    }
}
export const getIdeas = async () => {
    try {
        const res = await axios.get("http://localhost:4000/ideas", {
            headers: {
                Authorization: `Bearer ${authService.getToken()}`,
            },
        });

        return { data: res.data, status: res.status };
    } catch (error) {
        return { status: error.status, error: error.response?.data || "Hubo un error al obtener las ideas" };
    }
}
export const getRankingIdeas = async () => {
    try {
        const res = await axios.get("http://localhost:4000/ideasByVotes");

        return { data: res.data, status: res.status };
    } catch (error) {
        return { status: error.status, error: error.response?.data || "Hubo un error al obtener las ideas" };
    }
}
export const getRankingIdeasLogged = async () => {
    try {
        const res = await axios.get("http://localhost:4000/ideasByVotesLogged", {
            headers: {
                Authorization: `Bearer ${authService.getToken()}`,
            },
        });
        return { data: res.data, status: res.status };
    } catch (error) {
        return { status: error.status, error: error.response?.data || "Hubo un error al obtener las ideas" };
    }
}

export const createIdea = async (idea) => {
    try {
        const res = await axios.post("http://localhost:4000/idea", { idea }, {
            headers: {
                Authorization: `Bearer ${authService.getToken()}`,
            },
        });
        return { status: res.status }
    } catch (error) {
        return { status: error.status }
    }
}

export const likeIdea = async (ideaId) => {
    try {
        const res = await axios.post(`http://localhost:4000/idea/${ideaId}/vote`, {}, {
            headers: {
                Authorization: `Bearer ${authService.getToken()}`,
            },
        });
        return { status: res.status }
    } catch (error) {
        return { status: error.status }
    }
}