import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../components/HomePage";
import { NotFoundPage } from "../components/NotFoundPage";
import { LoginPage } from "../components/LoginPage";
import { RegisterPage } from "../components/RegisterPage";
import { SupportPage } from "../components/SupportPage";
import { AdminCompany } from "../components/AdminCompany";
import Panel from "../pages/PanelPage";
// import JobsDetails from "../components/JobsDetails";
import { AdminRoutes, ProtectedRoutes } from "./ProtectedRoutes";
import CompanyRegister from "../components/CompanyRegister";
import StudentProfile from "../components/StudentProfile";
import { CompanyConfirmedPage } from "../pages/CompanyConfirmed";
// import JobsSales from "../components/JobsSales";
import { JobSearchPage } from "../pages/JobSearch";
import { Feed } from "@mui/icons-material";

import { SelectCompanyPage }  from "../pages/SelectCompanyPage";

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
            <Route path="/admin" element={<AdminCompany />} />
          </Route>
          <Route path="/profile" element={<StudentProfile />} />
          <Route path="/home" element={<Feed />} />
        </Route>

        <Route path="/panel" element={<Panel />} />

        <Route path="/profile" element={<StudentProfile />} />
        <Route path="/buscar-empleo" element={<JobSearchPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/registro-de-compañia" element={<CompanyRegister />} />
        <Route path="/seleccionar-compañia" element={<SelectCompanyPage />} />
        <Route path="/company-confirmed" element={<CompanyConfirmedPage />} />
        <Route path="/support" element={<SupportPage />} />
      </Routes>
    </BrowserRouter>
  );
};
