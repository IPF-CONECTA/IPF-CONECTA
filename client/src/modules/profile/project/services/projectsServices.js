import axios from "axios";
import { authService } from "../../../auth/services/authService";
import { end } from "@cloudinary/url-gen/qualifiers/textAlignment";

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
    console.log({ "data que ingresa al servicio": projectData })
    const project = {
      name: projectData.name,
      smallDescription: projectData.smallDescription,
      description: projectData.description,
      projectLogo: projectData.projectLogo,
      projectLink: projectData.projectLink,
      startDate: `01/${projectData.startDateMonth}/${projectData.startDateYear}`,
      endDate: projectData.endDateMonth !== "null" ? (`01/${projectData.endDateMonth}/${projectData.endDateYear}`) : null,
      private: projectData.private,
    };
    console.log({ "data que se envia al back": project })
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
      return { data: response.data, status: response.status };
    } catch (error) {
      return { status: error.status, message: error.response.data.errors || error.response?.data || "Hubo un error al agregar el proyecto" };
    }
  },
};
