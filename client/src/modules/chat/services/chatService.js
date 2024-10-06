import axios from "axios";
import { authService } from "../../auth/services/authService";

export const chatService = {
  sendMessage: async (receptor, message) => {
    try {
      const res = await axios.post(
        `http://localhost:4000/message/send/${receptor}`,
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
        `http://localhost:4000/user/get-user-info/${username}`,
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

  getChatId: async (profile1Id, profile2Id) => {
    try {
      const res = await axios.get(
        "http://localhost:4000/get-chat",
        { profile1Id, profile2Id },
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
};
