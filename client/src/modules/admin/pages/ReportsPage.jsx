import React from "react";
import { SideBar } from "../../ui/components";
import { ReportsContainer } from "../components/Reports";
import { Link } from "react-router-dom";

export const ReportsPage = () => {
  return (
    <>
      <SideBar />
      <main
        className="py-3 pe-5"
        style={{ marginLeft: "6rem", height: "100vh" }}
      >
        <nav aria-label="breadcrumb" className="fs-5 fw-semibold">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={-1}> Administrar</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Reportes
            </li>
          </ol>
        </nav>
        <ReportsContainer />
      </main>
    </>
  );
};
