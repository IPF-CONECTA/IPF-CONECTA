import React, { useEffect, useState } from "react";
import { getReportReasons } from "../../app/services/reportServices";

export const ReportFilters = ({
  setPage,
  setStatus,
  setReportableType,
  setOrderBy,
  setReasonId,
}) => {
  const [reportReasons, setReportReasons] = useState([]);
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
    <div className="filters d-flex w-50 my-3 gap-2">
      <select
        onChange={(e) => {
          setPage(1);
          setStatus(e.target.value);
        }}
        className="form-select"
        name="status"
        defaultValue={"pending"}
      >
        <option value="">Estado</option>
        <option value="pending">Pendientes</option>
        <option value="resolved">Resueltas</option>
      </select>
      <select
        onChange={(e) => {
          setPage(1);
          setReportableType(e.target.value);
        }}
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
        onChange={(e) => {
          setPage(1);
          setReasonId(e.target.value);
        }}
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
        onChange={(e) => {
          setPage(1);
          setOrderBy(e.target.value);
        }}
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
  );
};
