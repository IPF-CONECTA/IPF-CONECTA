import axios from 'axios';
export const authService = {
    login: async ({ email, password }) => {
        try {
            const res = await axios.post(`http://localhost:4000/auth/login`, {
                user: {
                    email,
                    password,
                },
            });
            return { data: res.data, status: res.status }
        } catch (error) {

            return error.response.status || error.code
        }
    },

    logout: () => {
        localStorage.removeItem('token');
    },

    getToken: () => {
        return JSON.parse(localStorage.getItem('token'));
    },

    setToken: (data) => {
        localStorage.setItem('token', JSON.stringify(data));
    },

    removeToken: () => {
        localStorage.removeItem('token');
    },
    verifyToken: async (token) => {
        try {
            const res = await axios.get(`http://localhost:4000/auth/verify-token`, {
                headers: {
                    token: token
                }
            });
            return { data: res.data, status: res.status }
        } catch (error) {
            console.log(error)
            return error.response.status || error.code
        }
    }
};