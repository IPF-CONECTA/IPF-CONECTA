import React, { useEffect, useReducer } from "react";
import { authContext } from "./Context.js";
import { authReducer } from "./reducer.js";
import { useNoti } from "../../hooks/useNoti.jsx";
import { authService } from "../../modules/auth/services/authService.js";

export const AuthProvider = ({ children }) => {
  const token = authService.getToken();
  const noti = useNoti();
  const initialState = {
    user: {},
    isVerified: false,
    token: token ? token : null,
    isLogged: false,
    role: "",
  };
  const validateToken = async (token) => {
    if (token) {
      const { data, status } = await authService.verifyToken(token);
      if (status != 200) {
        authService.removeToken();
        return noti("Inicie sesión", "error");
      }
      dispatch({
        type: "LOGIN",
        payload: {
          user: data.existingUser,
          isVerified: data.isVerified,
          token: data.token,
          isLogged: true,
          role: data.existingUser.role.name,
        },
      });
    }
  };
  useEffect(() => {
    validateToken(token);
  }, [token]);

  const [authState, dispatch] = useReducer(authReducer, initialState);

  const login = async (credentials) => {
    const res = await authService.login(credentials);
    if (res.status != 200) {
      return noti(res.message || "error", "error");
    }
    authService.setToken(res.data.response.token);
    dispatch({
      type: "LOGIN",
      payload: {
        user: res.data.response.existingUser,
        isVerified: res.data.isVerified,
        token: res.data.token,
        isLogged: true,
        role: res.data.response.existingUser.role.name,
      },
    });
    noti(res.data.message, "success");
    const response = { role: res.data.response.existingUser.role.name };

    if (res.data.response.existingUser.role.name === "recruiter") {
      response.associations = res.data.response.associations;
    }

    return response;
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    authService.logout();
    noti("Sesión cerrada", "success");
  };

  return (
    <authContext.Provider value={{ login, logout, authState }}>
      {children}
    </authContext.Provider>
  );
};
