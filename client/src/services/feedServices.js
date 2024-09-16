import axios from "axios";
import { authService } from "./authService";

export const getPosts = async () => {
    try {
        const res = await axios.get("http://localhost:4000/feed/posts",
            {
                headers: {
                    Authorization: `Bearer ${authService.getToken()}`,
                },
            }
        );
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
                    Authorization: `Bearer ${authService.getToken()}`,
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

export const getProfile = async (id) => {
    try {
        const res = await axios.get(`http://localhost:4000/get-user-profile/${id}`, {
            headers: {
                Authorization: `Bearer ${authService.getToken()}`
            }
        })
        return { data: res.data, status: res.status }
    } catch (error) {
        return { status: error.status, error: error.message }
    }
}

export const getProfileInfo = async (id) => {
    try {
        const res = await axios.get(`http://localhost:4000/get-user-info/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${authService.getToken()}`,
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
        const res = await axios.post(`http://localhost:4000/follow/${idToFollow}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${authService.getToken()}`,
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
                    Authorization: `Bearer ${authService.getToken()}`,
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

export const postSvc = async (post, postId = null) => {
    try {
        const res = await axios.post(`http://localhost:4000/feed/post`, {
            post: {
                content: post,
                postId: postId,
            }
        }, {
            headers: {
                Authorization: `Bearer ${authService.getToken()}`
            }
        })
        return res.status
    } catch (error) {
        console.log(error)
        return error.status
    }
}

export const repostSvc = async (postId) => {
    try {
        const res = await axios.post('http://localhost:4000/repost', {
            postId
        }, {
            headers: {
                Authorization: `Bearer ${authService.getToken()}`
            }
        })
        return res.status
    } catch (error) {
        console.log(error)
        return error.status
    }
}

export const getPost = async (postId) => {
    try {
        const res = await axios.get(`http://localhost:4000/feed/post/${postId}`, {
            headers: {
                Authorization: `Bearer ${authService.getToken()}`
            }
        })
        return res.data
    } catch (error) {
        console.log(error)
        return error.status, error.message
    }
}


export const getExperiences = async (profileId) => {
    try {
        const res = await axios.get(`http://localhost:4000//experiences/${profileId}`,
            {
                headers: {
                    Authorization: `Bearer ${authService.getToken()}`
                }
            }
        )
        return res.data, res.status
    } catch (error) {
        return error.status
    }
}