import React, { useEffect, useState } from "react";
import { getReports } from "../services/adminServices";
import { ReportCard } from "./ReportCard";
import { getReportReasons } from "../../app/services/reportServices";
import { Link } from "react-router-dom";

export const ReportsContainer = ({ details = true }) => {
  const [status, setStatus] = useState(null);
  const [reportableType, setReportableType] = useState(null);
  const [orderBy, setOrderBy] = useState(null);
  const [reasonId, setReasonId] = useState(null);
  const [error, setError] = useState(null);
  const [reportReasons, setReportReasons] = useState([]);
  const [reports, setReports] = useState([]);
  const fetchReports = async () => {
    setReports([]);
    const res = await getReports(status, reportableType, reasonId, orderBy);
    if (res.status == 200) {
      setReports(res.data);
    } else {
      setError("Hubo un error al obtener los reportes");
    }
  };

  useEffect(() => {
    fetchReports();
  }, [status, reportableType, reasonId, orderBy]);

  useEffect(() => {
    const fetchReportReasons = async () => {
      const res = await getReportReasons();
      if (res.status == 200) {
        return setReportReasons(res.data);
      }
    };
    fetchReportReasons();
  }, []);
  return (
    <>
      <span className="fw-bold fs-3">Reportes ({reports.length})</span>
      {details && (
        <div className="filters d-flex w-50 my-3 gap-2">
          <select
            onChange={(e) => setStatus(e.target.value)}
            className="form-select"
            name="status"
            defaultValue={""}
          >
            <option value="">Estado</option>
            <option value="pending">Pendientes</option>
            <option value="resolved">Resueltas</option>
          </select>
          <select
            onChange={(e) => setReportableType(e.target.value)}
            className="form-select"
            name="type"
            defaultValue={""}
          >
            <option value="">Tipo</option>
            <option value="post">Publicaciones</option>
            <option value="job">Trabajos</option>
            <option value="profile">Perfiles</option>
          </select>
          <select
            onChange={(e) => setReasonId(e.target.value)}
            className="form-select"
            name="reason"
            defaultValue={""}
          >
            <option value="">Razón</option>
            {reportReasons.map((reason) => (
              <option key={reason.id} value={reason.id}>
                {reason.reason}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => setOrderBy(e.target.value)}
            className="form-select"
            name="orderBy"
            defaultValue={""}
          >
            <option value="">Ordenar por</option>
            <option value="date_desc">Fecha mas nuevos</option>
            <option value="date_asc">Fecha mas viejos</option>
            <option value="severity_desc">Más severos</option>
            <option value="severity_asc">Menos severos</option>
          </select>
        </div>
      )}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Fecha</th>
            <th scope="col">Tipo</th>
            <th scope="col">Razón</th>
            <th scope="col">Severidad</th>
            <th scope="col">Descripción</th>
            <th scope="col">Reportado por</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reports.slice(0, details ? reports.length : 5).map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              onResolve={fetchReports}
            />
          ))}
        </tbody>
      </table>
      {!details && (
        <div className="d-flex justify-content-end">
          <Link className="btn btn-dark fw-semibold" to={"/admin/reportes"}>
            Administrar reportes
          </Link>
        </div>
      )}
    </>
  );
};
