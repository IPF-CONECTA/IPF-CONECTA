import axios from "axios";
import { authService } from "../../../auth/services/authService";

export const projectsService = {

  getProjects: async (username) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/projects/${username}`,
        {
          headers: {
            Authorization: `Bearer ${authService.getToken()}`,
          },
        }
      );
      return { data: response.data, status: response.status };
    } catch (error) {
      return { status: error.status }
    }
  },
  createProject: async (project) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/project",
        { project },
        {
          headers: {
            Authorization: `Bearer ${authService.getToken()}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
