import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminRoutes, ProtectedRoutes } from "./ProtectedRoutes";
import {
  AdminPanelPage,
  CompanyConfirmedPage,
  CreateCompanyUbicationPage,
  FeedPage,
  HomePage,
  JobSearchPage,
  SelectCompanyPage,
  PanelPage,
  NotFoundPage,
  LoginPage,
  RegisterPage,
  CreateCompanyPage,
  SupportPage,
  PostPage,
  PendingMessageRecruiterPage,
  ProfilePage,
  CreateJobsFormPage,
  WaitingAssociationsApprovalPage,
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
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/inicio" element={<FeedPage />} />
          <Route path="/post/:postId" element={<PostPage />} />
        </Route>

        <Route path="/panel" element={<PanelPage />} />

        <Route path="/buscar-empleo" element={<JobSearchPage />} />

        <Route path="*" element={<NotFoundPage />} />
        <Route path="/iniciar-sesion" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/registro-de-compañia" element={<CreateCompanyPage />} />
        <Route path="/seleccionar-compañia" element={<SelectCompanyPage />} />
        <Route
          path="/crear-sede/:companyId"
          element={<CreateCompanyUbicationPage />}
        />
        <Route
          path="/mis-compañias"
          element={<WaitingAssociationsApprovalPage />}
        />
        <Route
          path="/reclutador-en-espera"
          element={<PendingMessageRecruiterPage />}
        />
        <Route path="/company-confirmed" element={<CompanyConfirmedPage />} />
        <Route path="/contacto" element={<SupportPage />} />
        <Route path="/nuevo-empleo" element={<CreateJobsFormPage />} />
      </Routes>
    </BrowserRouter>
  );
};
