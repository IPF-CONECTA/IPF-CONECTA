import axios from "axios";
import { authService } from "../../auth/services/authService";
import { BASE_URL } from "../../../constants/BASE_URL";
export const updateAbout = async (data, username) => {
  try {
    const res = await axios.patch(
      `${BASE_URL}/about`,
      {
        username,
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


export const getProfileIdByUsername = async (username) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/get-user-profile/${username}`,
      {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      }
    );
    return { data: res.data, status: res.status };
  } catch (error) {
    console.log(error);
  }
};


export const getConnections = async (username, typeConnection) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/connections/${username}/${typeConnection}`,
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
}