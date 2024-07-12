import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../components/HomePage";
import { NotFoundPage } from "../components/NotFoundPage";
import { LoginPage } from "../components/LoginPage";
import { RegisterPage } from "../components/RegisterPage";
import { SupportPage } from "../components/SupportPage";
import { AdminCompany } from "../components/AdminCompany";
import Panel from "../pages/PanelPage";
import JobsDetails from "../components/JobsDetails";
import StudentProfile from "../components/StudentProfile";
import { AdminRoutes, ProtectedRoutes } from "./ProtectedRoutes";
import CompanyRegister from "../components/CompanyRegister";
import JobsSales from "../components/JobsSales";

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
          <Route path="/panel" element={<Panel />} />
          <Route path="/profile" element={<StudentProfile />} />
        </Route>
        <Route path="/job/:id" element={<JobsDetails />} />
        <Route path="/jobs" element={<JobsSales />} />

        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/company/register" element={<CompanyRegister />} />
        <Route path="/support" element={<SupportPage />} />
      </Routes>
    </BrowserRouter>
  );
};
