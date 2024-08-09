import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminRoutes, ProtectedRoutes } from "./ProtectedRoutes";
import {
  AdminPanel,
  CompanyConfirmedPage,
  CreateCompanyPage,
  FeedPage,
  JobSearchPage,
  LoginPage,
  MainPage,
  NotFoundPage,
  PanelPage,
  RegisterPage,
  SelectCompanyPage,
} from "../pages";

export const Routers = () => {
  return (
    <BrowserRouter>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/" element={<AdminRoutes />}>
            <Route path="/admin" element={<AdminPanel />} />
          </Route>
          <Route path="/profile" element={<StudentProfilePage />} />
          <Route path="/home" element={<FeedPage />} />
        </Route>

        <Route path="/panel" element={<PanelPage />} />

        <Route path="/profile" element={<StudentProfile />} />
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
