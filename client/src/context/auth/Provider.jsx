import React, { useEffect, useReducer } from "react";
import { authContext } from "./Context.js";
import { authReducer } from "./reducer.js";
import { useNoti } from "../../hooks/useNoti.jsx";
import { authService } from "../../services/authService.js";

export const AuthProvider = ({ children }) => {
  const token = authService.getToken();
  const noti = useNoti();
  const validateToken = async (token) => {
    if (token) {
      const { data, status } = await authService.verifyToken(token);
      console.log(data);
      if (status != 200) {
        authService.removeToken();
        return noti("Inicie sesion nuevamente", "error");
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

  const initialState = {
    user: {},
    isVerified: false,
    token: token ? token : "",
    isLogged: false,
    role: "",
  };

  const [authState, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    validateToken(token);
  }, []);

  const login = async (credentials) => {
    const res = await authService.login(credentials);
    console.log(res);
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
    return res.data.response.existingUser.role.name;
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
