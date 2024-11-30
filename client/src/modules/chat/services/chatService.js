import axios from "axios";
import { authService } from "../../auth/services/authService";
import { BASE_URL } from "../../../constants/BASE_URL";
export const chatService = {
  sendMessage: async (receptor, message) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/message/send/${receptor}`,
        {
          message,
        },
        { headers: { Authorization: `Bearer ${authService.getToken()}` } }
      );
      return { data: res.data, status: res.status };
    } catch (error) {
      console.error(error);

      const status = error.response ? error.response.status : 500;
      const message = error.response
        ? error.response.data.message
        : "Error desconocido";

      return { status, message };
    }
  },

  getReceiver: async (username) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/user/get-user-info/${username}`,
        {
          headers: { Authorization: `Bearer ${authService.getToken()}` },
        }
      );
      return { data: res.data, status: res.status };
    } catch (error) {
      console.error(error);

      const status = error.response ? error.response.status : 500;
      const message = error.response
        ? error.response.data.message
        : "Error desconocido";

      return { status, message };
    }
  },

  getChatId: async (username) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/get-chat/${username}`,
        {
          headers: { Authorization: `Bearer ${authService.getToken()}` },
        }
      );

      return { data: res.data, status: res.status };
    } catch (error) {
      console.error(error);

      const status = error.response ? error.response.status : 500;
      const message = error.response
        ? error.response.data.message
        : "Error desconocido";

      return { status, message };
    }
  },

  getChatsByProfile: async () => {
    try {
      const res = await axios.get(`${BASE_URL}/get-profile-chats`, {
        headers: { Authorization: `Bearer ${authService.getToken()}` },
      });
      console.log(res)
      return { data: res.data, status: res.status };
    } catch (error) {
      console.error(error);

      const status = error.response ? error.response.status : 500;
      const message = error.response
        ? error.response.data.message
        : "Error desconocido";

      return { status, message };
    }
  },
};
