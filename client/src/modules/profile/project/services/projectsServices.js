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
  getProject: async (id) => {
    try {
      const res = await axios.get(`http://localhost:4000/project/${id}`, {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      })
      return { data: res.data, status: res.status }
    } catch (error) {
      return { status: error.status }
    }
  },
  createProject: async (projectData) => {
    const formData = new FormData();

    formData.append("project[name]", projectData.name);
    formData.append("project[smallDescription]", projectData.smallDescription);
    formData.append("project[description]", projectData.description);
    formData.append("project[projectLogo]", projectData.projectLogo);
    formData.append("project[projectLink]", projectData.projectLink);
    formData.append("project[startDate]", `${projectData.startDateMonth}/01/${projectData.startDateYear}`);
    formData.append("project[private]", projectData.private);
    if (projectData.skills.length > 0) {
      projectData.skills.forEach((skill) => {
        formData.append("project[skills]", skill);
      }
      )
    }
    if (projectData.endDateMonth !== "null") {
      formData.append("project[endDate]", `${projectData.endDateMonth}/01/${projectData.endDateYear}`);
    }
    if (projectData.images) {
      projectData.images.forEach((image) => {
        formData.append("images", image);
      });
    }

    // Añadir el logo del proyecto si está presente
    if (projectData.projectLogo) {
      formData.append("project[projectLogo]", projectData.projectLogo);
    }
    try {

      const response = await axios.post(
        "http://localhost:4000/project",
        formData,
        {
          headers: {
            Authorization: `Bearer ${authService.getToken()}`,
          },
        }
      );
      return { data: response.data, status: response.status };
    } catch (error) {
      return { status: error.status, message: error.response.data.errors || error.response?.data || "Hubo un error al agregar el proyecto" };
    }
  },
};
