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
          user: data.existingUser,
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
    let { email, password } = credentials;
    console.log(email, password);

    const { data, status } = await authService.login(credentials);
    if (status != 200) {
      return toast("Error al iniciar sesión", "error");
    }
    authService.setToken(data.response.token);
    dispatch({
      type: "LOGIN",
      payload: {
        user: data.response.existingUser,
        isVerified: data.response.isVerified,
        token: data.response.token,
        isLogged: true,
        role: data.response.role,
      },
    });
    console.log(data);
    toast(data.message, "success");
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
