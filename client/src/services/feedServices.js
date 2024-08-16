import axios from "axios";
import { authService } from "./authService";

export const getPosts = async () => {
    try {
        const res = await axios.get("http://localhost:4000/feed/post",
            {
                headers: {
                    authorization: `Bearer ${authService.getToken()}`,
                },
            }
        );
        console.log(res)
        const data = res.data.rows;
        const statusCode = res.status;
        return { data, statusCode };
    } catch (error) {
        // console.error("Error al obtener los posts:", error);
        return { data: [], statusCode: error.response?.status, message: error.response?.data?.message };
    }
}

export const getAccounts = async () => {
    try {
        const res = await axios.get("http://localhost:4000/get-recomended-users",
            {
                headers: {
                    authorization: `Bearer ${authService.getToken()}`,
                },
            }
        );
        const data = res.data;
        const statusCode = res.status;
        return { data, statusCode };
    } catch (error) {
        console.error("Error al obtener los posts:", error);
        return {
            data: [], statusCode: error.response?.status, message: error.response?.data?.message
        };
    }
}

export const getProfileInfo = async (id) => {
    try {
        const res = await axios.get(`http://localhost:4000/get-user-info/${id}`,
            {
                headers: {
                    authorization: `Bearer ${authService.getToken()}`,
                },
            }
        );
        const data = res.data;
        const statusCode = res.status;
        return { data, statusCode };
    } catch (error) {
        return {
            data: null, statusCode: error.response?.status
        };
    }
}

export const followOrUnfollow = async (idToFollow) => {
    try {
        console.log(authService.getToken())
        const res = await axios.post(`http://localhost:4000/follow/${idToFollow}`,
            {},
            {
                headers: {
                    authorization: `Bearer ${authService.getToken()}`,
                },
            }
        );
        const data = res.data;
        const statusCode = res.status;
        return { data, statusCode };
    } catch (error) {
        console.log(error)
        return {
            data: error.data.message, statusCode: error.response?.status
        };
    }
}

export const like = async (id) => {
    try {
        const res = await axios.post(`http://localhost:4000/like/${id}`,
            {},
            {
                headers: {
                    authorization: `Bearer ${authService.getToken()}`,
                },
            }
        );
        const statusCode = res.status;
        return { statusCode };
    } catch (error) {
        return {
            data: error.data.message, statusCode: error.response?.status
        };
    }
}