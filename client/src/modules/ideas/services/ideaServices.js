import axios from "axios";
import { authService } from "../../auth/services/authService";
import { BASE_URL } from "../../../constants/BASE_URL";

export const getIdeasLogged = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/ideasLogged`, {
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
        const res = await axios.get(`${BASE_URL}/ideas`, {
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
        const res = await axios.get(`${BASE_URL}/ideasByVotes`);

        return { data: res.data, status: res.status };
    } catch (error) {
        return { status: error.status, error: error.response?.data || "Hubo un error al obtener las ideas" };
    }
}
export const getRankingIdeasLogged = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/ideasByVotesLogged`, {
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
    console.log("idea en el servicio", idea)
    try {
        const res = await axios.post(`${BASE_URL}/idea`, { idea }, {
            headers: {
                Authorization: `Bearer ${authService.getToken()}`,
            },
        });
        console.log(res)
        return { status: res.status }
    } catch (error) {
        console.log(error)
        return { status: error.status }
    }
}

export const likeIdea = async (ideaId) => {
    try {
        const res = await axios.post(`${BASE_URL}/idea/${ideaId}/vote`, {}, {
            headers: {
                Authorization: `Bearer ${authService.getToken()}`,
            },
        });
        return { status: res.status }
    } catch (error) {
        return { status: error.status }
    }
}