import axios from "axios";
import { BASE_URL } from "../../../constants/BASE_URL";
export const authService = {
  submitVerificationCode: async (code) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/confirm-account`,
        { receivedCode: code },
        {
          headers: {
            Authorization: `Bearer ${authService.getToken()}`,
          },
        }
      );

      return response;
    } catch (error) {
      return error;
    }
  },
  isUsername: async (username) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/is-username-available`,
        {
          username,
        }
      );
      return res.status;
    } catch (error) {
      return error.status;
    }
  },
  isEmail: async (email) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/is-email-available`,
        {
          email,
        }
      );
      return res.status;
    } catch (error) {
      return error.status;
    }
  },
  login: async ({ email, password }) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, {
        user: {
          email,
          password,
        },
      });
      return { data: res.data, status: res.status };
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message ||
        error?.response?.data?.errors?.[0]?.msg ||
        "Unknown error";
      const errorStatus =
        error?.response?.status || error?.code || "Unknown status";
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
      const res = await axios.get(`${BASE_URL}/auth/verify-token`, {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      });
      return { data: res.data, status: res.status };
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
