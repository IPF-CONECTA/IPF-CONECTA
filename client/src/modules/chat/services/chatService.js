import axios from "axios";
import { authService } from "../../auth/services/authService";

export const chatService = {
  createChat: async (profile1Id, profile2Id) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/chat/create",
        { profile1Id, profile2Id },
        {
          headers: {
            Authorization: `Bearer ${authService.getToken()}`,
          },
        }
      );
      console.log({ profile1Id, profile2Id });
      return res.data;
    } catch (error) {
      console.error(error);
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
