import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../components/HomePage";
import { NotFoundPage } from "../components/NotFoundPage";
import { LoginPage } from "../components/LoginPage";
import { RegisterPage } from "../components/RegisterPage";
import { SupportPage } from "../components/SupportPage";
import { AdminCompany } from "../components/AdminCompany";
import Panel from "../pages/PanelPage";

export const Routers = () => {
  return (
    <BrowserRouter>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/admin" element={<AdminCompany />} />
        <Route path="/panel" element={<Panel />} />
      </Routes>
    </BrowserRouter>
  );
};
