import axios from "axios";

import { authService } from "../../../auth/services/authService.js";
import { BASE_URL } from "../../../../constants/BASE_URL.js";
export const postsServices = {
  getPostsByUsername: async (username) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/feed/posts/${username}`,
        {
          headers: {
            Authorization: `Bearer ${authService.getToken()}`,
          },
        }
      );
      return { data: res.data, status: res.status };
    } catch (error) {
      console.log("error", error)
      return { status: error.status };
    }
  },
};
