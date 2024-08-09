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
        const data = res.data.rows;
        console.log('POSTS: ==============')
        console.log(data)
        const statusCode = res.status;
        return { data, statusCode };
    } catch (error) {
        console.error("Error al obtener los posts:", error);
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
        console.log('ACCOUNTS: ==============')
        console.log(data)
        const statusCode = res.status;
        return { data, statusCode };
    } catch (error) {
        console.error("Error al obtener los posts:", error);
        return {
            data: [], statusCode: error.response?.status
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
        const res = axios.post(`http://localhost:4000/follow/${idToFollow}`, {
            headers: {
                authorization: `Bearer ${authService.getToken()}`,
            },
        });

        const data = res.data;
        const statusCode = res.status;
        return { data, statusCode };
    } catch (error) {
        return {
            data: error.data.message, statusCode: error.response?.status
        };
    }
}