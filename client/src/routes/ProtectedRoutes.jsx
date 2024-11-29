import React, { useContext, useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { authContext } from "../context/auth/Context";
import { VALID_ROLES } from "../constants/roles";
import { authService } from "../modules/auth/services/authService";

export const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const { authState } = useContext(authContext);
  useEffect(() => {
    if (!authService.getToken()) {
      navigate("/iniciar-sesion");
    }
  }, [authState.token]);
  return authService.getToken() ? <Outlet /> : <Navigate to="/" />;
};

export const AdminRoutes = () => {
  const navigate = useNavigate();

  const { authState } = useContext(authContext);

  useEffect(() => {
    if (!authService.getToken()) {
      navigate("/iniciar-sesion");
    } else if (authState.role) {
      if (authState.role !== VALID_ROLES.admin) {
        navigate("/");
      }
    }
  }, [authState.token]);
  return authService.getToken() ? <Outlet /> : <Navigate to="/" />;
};
