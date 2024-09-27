import axios from "axios";
import { authService } from "../../auth/services/authService";

export const updateAbout = async (data, profileId) => {
  try {
    const res = await axios.patch(
      "http://localhost:4000/about",
      {
        profileId,
        about: data.about,
      },
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
export const deleteAbout = async (profileId) => {
  try {
    const res = await axios.delete(`http://localhost:4000/about/${profileId}`, {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });
    return { status: res.status };
  } catch (error) {
    return { status: error.status };
  }
};
