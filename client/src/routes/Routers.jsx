import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminRoutes, ProtectedRoutes } from "./ProtectedRoutes";
import {
  AdminPanelPage,
  CompanyConfirmedPage,
  FeedPage,
  HomePage,
  JobSearchPage,
  SelectCompanyPage,
  StudentProfilePage,
  PanelPage,
  NotFoundPage,
  LoginPage,
  RegisterPage,
  CreateCompanyPage,
  SupportPage
} from "../pages";

export const Routers = () => {
  return (
    <BrowserRouter>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/" element={<AdminRoutes />}>
            <Route path="/admin" element={<AdminPanelPage />} />
          </Route>
          <Route path="/profile" element={<StudentProfilePage />} />
          <Route path="/inicio" element={<FeedPage />} />
        </Route>

        <Route path="/panel" element={<PanelPage />} />

        <Route path="/profile" element={<StudentProfilePage />} />
        <Route path="/buscar-empleo" element={<JobSearchPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/registro-de-compañia" element={<CreateCompanyPage />} />
        <Route path="/seleccionar-compañia" element={<SelectCompanyPage />} />
        <Route path="/company-confirmed" element={<CompanyConfirmedPage />} />
        <Route path="/support" element={<SupportPage />} />
      </Routes>
    </BrowserRouter>
  );
};
