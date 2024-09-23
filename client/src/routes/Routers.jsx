import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminRoutes, ProtectedRoutes } from "./ProtectedRoutes";
import {
  CompanyConfirmedPage,
  CreateCompanyUbicationPage,
  FeedPage,
  HomePage,
  JobSearchPage,
  SelectCompanyPage,
  NotFoundPage,
  LoginPage,
  RegisterPage,
  CreateCompanyPage,
  SupportPage,
  PostPage,
  MessageRecruiterPage,
  ProfilePage,
  CreateJobsFormPage,
  WaitingAssociationsApprovalPage,
  AdminDashboardPage,
  CompaniesPanelPage,
  AssociationsPanelPage,
} from "../pages";
import SkillViewAdmin from "../components/SkillViewAdmin";
import SkillViewUser from "../components/SkillViewUser";
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
            <Route path="/admin/dash" element={<AdminDashboardPage />} />
            <Route path="/admin/empresas" element={<CompaniesPanelPage />} />
            <Route
              path="/admin/asociaciones"
              element={<AssociationsPanelPage />}
            />
          </Route>
          <Route path="/inicio" element={<FeedPage />} />
          <Route path="/post/:postId" element={<PostPage />} />
        </Route>
        <Route path="/perfil/:profileId" element={<ProfilePage />} />
        <Route path="/guardados" element={<ProfilePage />} />
        <Route path="/skills" element={< SkillViewAdmin />} />
        <Route path="/skill" element={< SkillViewUser />} />

        <Route path="/buscar-empleo" element={<JobSearchPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/iniciar-sesion" element={<LoginPage />} />
        <Route path="/registrate" element={<RegisterPage />} />
        <Route path="/registrar-empresa" element={<CreateCompanyPage />} />
        <Route path="/seleccionar-empresa" element={<SelectCompanyPage />} />
        <Route
          path="/crear-sede/:companyId"
          element={<CreateCompanyUbicationPage />}
        />
        <Route
          path="/mis-empresas"
          element={<WaitingAssociationsApprovalPage />}
        />
        <Route
          path="/solicitud-del-mentor"
          element={<MessageRecruiterPage />}
        />
        <Route path="/company-confirmed" element={<CompanyConfirmedPage />} />
        <Route path="/contacto" element={<SupportPage />} />
        <Route path="/nuevo-empleo" element={<CreateJobsFormPage />} />
      </Routes>
    </BrowserRouter>
  );
};
