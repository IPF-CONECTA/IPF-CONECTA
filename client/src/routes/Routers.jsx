import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminRoutes, ProtectedRoutes } from "./ProtectedRoutes";
import {
  AdminAssociationsPanelPage,
  AdminCompaniesPanelPage,
  AdminDashboardPage,
  CompanyConfirmedPage,
  CreateCompanyPage,
  CreateCompanyUbicationPage,
  CreateProjectPage,
  FeedPage,
  HomePage,
  JobCreatePage,
  JobSearchPage,
  LoginPage,
  MessageRecruiterPage,
  NotFoundPage,
  PostPage,
  ProfilePage,
  ProfileProjectsPage,
  RegisterPage,
  SelectCompanyPage,
  SupportPage,
  WaitingAssociationsApprovalPage,
  Ideas,
} from "../pages";
import SkillViewAdmin from "../modules/recruiter/components/SkillViewAdmin";
import SkillViewUser from "../modules/recruiter/components/SkillViewUser";
export const Routers = () => {
  return (
    <BrowserRouter>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Skills" element={<SkillViewAdmin />} />
          <Route path="/Skill" element={<SkillViewUser />} />
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/" element={<AdminRoutes />}>
            <Route path="/admin/dash" element={<AdminDashboardPage />} />
            <Route
              path="/admin/empresas"
              element={<AdminCompaniesPanelPage />}
            />
            <Route
              path="/admin/asociaciones"
              element={<AdminAssociationsPanelPage />}
            />
          </Route>
          <Route path="/inicio" element={<FeedPage />} />
          <Route path="/post/:postId" element={<PostPage />} />
        </Route>
        <Route path="/perfil/:username" element={<ProfilePage />} />
        <Route path="/:usuario/proyectos" element={<ProfileProjectsPage />} />
        <Route path="/guardados" element={<ProfilePage />} />
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
        <Route path="/nuevo-proyecto" element={<CreateProjectPage />} />
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
        <Route path="/nuevo-empleo" element={<JobCreatePage />} />
        <Route path="/ideas-de-proyectos" element={<Ideas />} />
      </Routes>
    </BrowserRouter>
  );
};
