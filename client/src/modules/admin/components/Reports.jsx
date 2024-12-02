import React, { useEffect, useState } from "react";
import { getReports } from "../services/adminServices";
import { ReportCard } from "./ReportCard";

export const ReportsContainer = () => {
  const [status, setStatus] = useState("pending");
  const [error, setError] = useState(null);
  const [reports, setReports] = useState([]);
  const fetchReports = async () => {
    const res = await getReports(status);
    if (res.status == 200) {
      setReports(res.data);
    } else {
      setError("Hubo un error al obtener los reportes");
    }
  };
  useEffect(() => {
    fetchReports();
  }, []);
  return (
    <>
      <span className="fw-bold fs-3">Reportes ({reports.length})</span>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Fecha</th>
            <th scope="col">Tipo</th>
            <th scope="col">Razón</th>
            <th scope="col">Importancia</th>
            <th scope="col">Descripción</th>
            <th scope="col">Reportado por</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              onResolve={fetchReports}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
