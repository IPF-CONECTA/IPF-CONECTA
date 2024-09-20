import axios from "axios";
import { authService } from "./authService";

export const projectsService = {
  getMyProjects: async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/projects/profile",
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
  getAllProjects: async () => {
    try {
      const response = await axios.get("http://localhost:4000/projects/all", {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      });
      return response;
    } catch (error) {
      return error;
    }
  },
};
