import axios from "axios";
import { authService } from "../../../auth/services/authService";

export const projectsService = {

  getProjects: async (profileId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/projects/${profileId}`,
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
