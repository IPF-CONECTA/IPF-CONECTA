import React, { useEffect, useState } from "react";
import { getReports } from "../services/adminServices";
import { ReportCard } from "./ReportCard";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";
import { TbError404 } from "react-icons/tb";
import { ReportCardLoad } from "./ReportCardLoad";
import { ReportFilters } from "./ReportFilters";

export const ReportsContainer = ({ details = true }) => {
  const [status, setStatus] = useState("pending");
  const [reportableType, setReportableType] = useState(null);
  const [orderBy, setOrderBy] = useState(null);
  const [reasonId, setReasonId] = useState(null);
  const [error, setError] = useState(null);
  const [reports, setReports] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchReports = async () => {
    setReports([]);
    setError(null);
    setLoading(true);

    try {
      const res = await getReports(
        status,
        reportableType,
        reasonId,
        orderBy,
        page
      );

      if (res.status == 200) {
        setReports(res.data.rows);
        setTotalPages(res.data.totalPages);
        setCount(res.data.count);
      } else if (res.status == 404) {
        setError("No hay reportes para mostrar");
      } else {
        setError("Hubo un error al obtener los reportes");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [status, reportableType, reasonId, orderBy, page]);

  return (
    <div
      className="d-flex flex-column justify-content-between"
      style={{ minHeight: "91.5%" }}
    >
      <div>
        <span className="fw-bold fs-3">Reportes ({count})</span>
        {details && (
          <ReportFilters
            setPage={setPage}
            setStatus={setStatus}
            setReportableType={setReportableType}
            setOrderBy={setOrderBy}
            setReasonId={setReasonId}
          />
        )}
        <table className="table">
          <thead>
            <tr>
              {details && <th scope="col">Fecha</th>}
              <th scope="col">Tipo</th>
              <th scope="col">Razón</th>
              <th scope="col">Severidad</th>
              <th scope="col">Descripción</th>
              {details && <th scope="col">Reportado por</th>}
              <th scope="col">Estado</th>
              {details && <th scope="col">Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: details ? 9 : 5 }).map((_, index) => (
                  <ReportCardLoad key={index} details={details} />
                ))
              : reports
                  .slice(0, details ? reports.length : 5)
                  .map((report) => (
                    <ReportCard
                      details={details}
                      key={report.id}
                      report={report}
                      onResolve={fetchReports}
                    />
                  ))}
          </tbody>
        </table>
        {error && (
          <div className="d-flex flex-column align-items-center">
            {error}
            <TbError404 size={40} />
          </div>
        )}
      </div>
      {!details ? (
        <div className="d-flex justify-content-end">
          <Link className="btn btn-dark fw-semibold" to={"/admin/reportes"}>
            Administrar reportes
          </Link>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, p) => setPage(p)}
            variant="outlined"
            shape="rounded"
          />
        </div>
      )}
    </div>
  );
};
