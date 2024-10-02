import axios from "axios";
import { authService } from "../../auth/services/authService";

export const chatService = {
  createChat: async (receptor) => {
    try {
      const res = await axios.post(
        `http://localhost:4000/chat/create/${receptor}`,
        {},
        { headers: { Authorization: `Bearer ${authService.getToken()}` } }
      );
      return { data: res.data, status: res.status };
    } catch (error) {
      console.error(error);
      return { status: error.status, message: error.message };
    }
  },

  getChatsByProfileId: async () => {
    try {
      const res = await axios.get("http://localhost:4000/chat/get-chats", {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },
};
