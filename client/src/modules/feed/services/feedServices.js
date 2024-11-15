import axios from "axios";
import { authService } from "../../auth/services/authService";

export const getPosts = async (page) => {
  try {
    const res = await axios.get(`http://localhost:4000/feed/posts?page=${page}`, {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });
    return { data: res.data, status: res.status };
  } catch (error) {
    return {
      data: [],
      status: error.status,
      message: error.response?.data?.message || "Hubo un error al obtener las publicaciones",
    };
  }
};

export const getAccounts = async () => {
  try {
    const res = await axios.get("http://localhost:4000/get-recommended-profiles", {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });
    return { data: res.data, status: res.status };
  } catch (error) {
    return {
      data: [],
      status: error.status,
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
    return { data: res.data, status: res.status };
  } catch (error) {
    return {
      data: null,
      status: error.status,
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
    return { status: res.status };
  } catch (error) {
    return { status: res.status };
  }
};

export const postSvc = async (post, images, postId = null) => {
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
    return { status: res.status };
  } catch (error) {
    return { status: error.status };
  }
};

export const getPost = async (postId) => {
  try {
    const res = await axios.get(`http://localhost:4000/feed/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });
    return { data: res.data, status: res.status };
  } catch (error) {
    return { status: error.status };
  }
};

export const deletePost = async (postId) => {
  try {
    const res = await axios.delete(`http://localhost:4000/feed/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });
    return { status: res.status };
  } catch (error) {
    return { status: error.status };
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
