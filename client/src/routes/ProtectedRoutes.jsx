import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { authContext } from "../context/auth/Context";
import { VALID_ROLES } from "../constants/roles";

export const ProtectedRoutes = () => {
  const { authState } = useContext(authContext);
  return authState.token ? <Outlet /> : <Navigate to="/" />;
};

export const AdminRoutes = () => {
  const { authState } = useContext(authContext);
  return authState.role === VALID_ROLES.admin ? (
    <Outlet />
  ) : (
    <Navigate to="/iniciar-sesion" />
  );
};
