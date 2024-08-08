import axios from "axios";
export const authService = {
  login: async ({ email, password }) => {
    try {
      const res = await axios.post(`http://localhost:4000/auth/login`, {
        user: {
          email,
          password,
        },
      });
      return { data: res.data, status: res.status };
    } catch (error) {
      const errorMsg = error.response.data.message;
      const errorStatus = error.response.status || error.code;

      return { message: errorMsg, status: errorStatus };
    }
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  setToken: (data) => {
    localStorage.setItem("token", data);
  },

  removeToken: () => {
    localStorage.removeItem("token");
  },
  verifyToken: async () => {
    try {
      const res = await axios.get(`http://localhost:4000/auth/verify-token`, {
        headers: {
          authorization: `Bearer ${authService.getToken()}`,
        },
      });
      return { data: res.data.json(), status: res.status };
    } catch (error) {
      console.log(error);
      return error.response.status || error.code;
    }
  },
};
