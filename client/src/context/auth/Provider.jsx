import React, { useEffect, useReducer } from "react";
import { authContext } from "./Context.js";
import { authReducer } from "./reducer.js";
import { useNoti } from "../../hooks/useNoti.jsx";
import { authService } from "../../services/authService.js";

export const AuthProvider = ({ children }) => {
  const token = authService.getToken();
  const validateToken = async (token) => {
    if (token) {
      const { data, status } = await authService.verifyToken(token);
      if (status != 200) {
        authService.removeToken();
        return toast("Inicie sesion nuevamente", "error");
      }
      return dispatch({
        type: "LOGIN",
        payload: {
          user: data.userInfo,
          isVerified: data.isVerified,
          token: data.token,
          isLogged: true,
          role: data.role,
        },
      });
    }
  };
  const toast = useNoti();

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
    if (res.status != 200) {
      return toast(res.message, "error");
    }
    authService.setToken(res.data.response.token);
    dispatch({
      type: "LOGIN",
      payload: {
        user: res.data.response.userInfo,
        isVerified: res.data.response.isVerified,
        token: res.data.response.token,
        isLogged: true,
        role: res.data.response.role,
      },
    });
    toast(res.data.message, "success");
    return res.data.response.role;
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    authService.logout();
    toast("Sesión cerrada", "success");
  };

  return (
    <authContext.Provider value={{ login, logout, authState }}>
      {children}
    </authContext.Provider>
  );
};
