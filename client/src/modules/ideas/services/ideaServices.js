import axios from "axios";
import { authService } from "../../auth/services/authService";
import { BASE_URL } from "../../../constants/BASE_URL";

export const getIdeasLogged = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/ideasLogged`, {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });

    return { data: res.data, status: res.status };
  } catch (error) {
    return {
      status: error.status,
      error: error.response?.data || "Hubo un error al obtener las ideas",
    };
  }
};
export const getIdeas = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/ideas`, {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });

    return { data: res.data, status: res.status };
  } catch (error) {
    return {
      status: error.status,
      error: error.response?.data || "Hubo un error al obtener las ideas",
    };
  }
};

export const getIdeaById = async (ideaId) => {
  try {
    const res = await axios.get(`${BASE_URL}/idea/${ideaId}`, {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });

    return { data: res.data, status: res.status };
  } catch (error) {
    return {
      status: error.status,
      error: error.response?.data || "Hubo un error al obtener la idea",
    };
  }
};

export const getRankingIdeas = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/ideasByVotes`);

    return { data: res.data, status: res.status };
  } catch (error) {
    return {
      status: error.status,
      error: error.response?.data || "Hubo un error al obtener las ideas",
    };
  }
};
export const getRankingIdeasLogged = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/ideasByVotesLogged`, {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });
    return { data: res.data, status: res.status };
  } catch (error) {
    return {
      status: error.status,
      error: error.response?.data || "Hubo un error al obtener las ideas",
    };
  }
};

export const createIdea = async (newIdea) => {
  console.log("ideas", newIdea);
  const formData = new FormData();
  formData.append("title", newIdea.title);
  formData.append("description", newIdea.description);
  formData.append("category", newIdea.category);
  formData.append("state", newIdea.state);
  formData.append("objectives", newIdea.objectives);
  formData.append("justification", newIdea.justification);
  formData.append("technologies", newIdea.technologies);
  formData.append("complexity", newIdea.complexity);
  formData.append("beneficiaries", newIdea.beneficiaries);

  newIdea.attachments.forEach((file) => {
    formData.append("images", file);
  });
  try {
    const res = await axios.post(`${BASE_URL}/idea`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });
    return { status: res.status };
  } catch (error) {
    console.log("Error al crear la idea", error);
    return {
      status: error.status,
      error: error.response?.data || "Hubo un error al crear la idea",
    };
  }
};

export const likeIdea = async (ideaId) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/idea/${ideaId}/vote`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      }
    );
    return { status: res.status };
  } catch (error) {
    return { status: error.status };
  }
};
