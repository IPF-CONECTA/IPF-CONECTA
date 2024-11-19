import axios from "axios";

import { authService } from "../../../auth/services/authService.js";

export const postsServices = {
  getPostsByUsername: async (username) => {
    try {
      const res = await axios.get(
        `http://localhost:4000/feed/posts/${username}`,
        {
          headers: {
            Authorization: `Bearer ${authService.getToken()}`,
          },
        }
      );
      return { data: res.data, status: res.status };
    } catch (error) {
      console.error(error);
    }
  },
};
