import axios from "axios";
import { authService } from "../../auth/services/authService";

export const getPosts = async (page) => {
  try {
    const res = await axios.get(`http://localhost:4000/feed/posts?page=${page}`, {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });
    console.log("pagina ", page, "respuesta ", res)
    const data = res.data.rows;
    const statusCode = res.status;
    return { data, statusCode };
  } catch (error) {
    return {
      data: [],
      statusCode: error.response?.status,
      message: error.response?.data?.message || "Hubo un error al obtener las publicaciones",
    };
  }
};

export const getAccounts = async () => {
  try {
    const res = await axios.get("http://localhost:4000/get-recomended-users", {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });
    const data = res.data;
    const statusCode = res.status;
    return { data, statusCode };
  } catch (error) {
    return {
      data: [],
      statusCode: error.response?.status,
      message: error.response?.data?.message,
    };
  }
};

export const getProfile = async (username) => {
  try {
    const res = await axios.get(
      `http://localhost:4000/get-user-profile/${username}`,
      {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      }
    );
    return { data: res.data, status: res.status };
  } catch (error) {
    return { status: error.status, error: error.message };
  }
};

export const getProfileInfo = async (username) => {
  try {
    const res = await axios.get(`http://localhost:4000/get-user-info/${username}`, {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });
    const data = res.data;
    const statusCode = res.status;
    return { data, statusCode };
  } catch (error) {
    return {
      data: null,
      statusCode: error.response?.status,
    };
  }
};

export const followOrUnfollow = async (username) => {
  try {
    const res = await axios.post(
      `http://localhost:4000/follow/${username}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      }
    );
    return { data: res.data, status: res.status };
  } catch (error) {
    return {
      data: error.data.message,
      statusCode: error.response?.status,
    };
  }
};

export const like = async (id) => {
  try {
    const res = await axios.post(
      `http://localhost:4000/like/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      }
    );
    const statusCode = res.status;
    return { statusCode };
  } catch (error) {
    return {
      data: error.data.message,
      statusCode: error.response?.status,
    };
  }
};

export const postSvc = async (post, images, postId = null) => {
  console.log("postId en servicio", postId)
  const formData = new FormData();
  formData.append("content", post);
  if (postId) {
    formData.append("postId", postId);
  }
  images !== null && images.length > 0 &&
    images.forEach((image) => {
      formData.append("images", image);
    });


  try {
    const res = await axios.post(
      `http://localhost:4000/feed/post`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      }
    );
    return res.status;
  } catch (error) {
    return error.status;
  }
};

export const repostSvc = async (postId) => {
  try {
    const res = await axios.post(
      "http://localhost:4000/repost",
      {
        postId,
      },
      {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      }
    );
    return res.status;
  } catch (error) {
    return error.status;
  }
};

export const getPost = async (postId) => {
  try {
    const res = await axios.get(`http://localhost:4000/feed/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });
    return res.data;
  } catch (error) {
    return error.status, error.message;
  }
};

export const deletePost = async (postId) => {
  try {
    const res = await axios.delete(`http://localhost:4000/feed/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });
    return res.status;
  } catch (error) {
    return error.status;
  }
};

export const getExperiences = async (username) => {
  try {
    const res = await axios.get(
      `http://localhost:4000/experiences/${username}`,
      {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      }
    );

    return { data: res.data, status: res.status };
  } catch (error) {
    return { status: error.status };
  }
};
