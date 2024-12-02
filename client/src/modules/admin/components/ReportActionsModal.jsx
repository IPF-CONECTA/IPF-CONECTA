import { Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getReportById, resolveReport } from "../services/adminServices";
import { useNoti } from "../../../hooks/useNoti";
import { BASE_URL } from "../../../constants/BASE_URL";
import { FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ReportedContentModal } from "./ReportedContentModal";

export const ReportActionsModal = ({ open, setOpen, reportId, onResolve }) => {
  const [report, setReport] = useState(null);
  const [openContent, setOpenContent] = useState(false);
  const noti = useNoti();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    const fetchReport = async () => {
      const res = await getReportById(reportId);
      if (res.status == 200) {
        return setReport(res.data);
      }
      setOpen(false);
      return noti("Hubo un error al obtener el reporte", "error");
    };
    open && fetchReport();
  }, [open, reportId]);

  const action = watch("action");
  const onSubmit = async (data) => {
    const res = await resolveReport(data, reportId);
    if (res.status !== 204) {
      return noti("Hubo un error al resolver el reporte", "error");
    }
    onResolve("pending");
    noti("Reporte resuelto", "success");
    setOpen(false);
    reset();
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  return (
    <>
      <Dialog maxWidth="xs" fullWidth open={open} onClose={handleClose}>
        <div className="rounded-3 bg-white p-3">
          <div className="d-flex justify-content-between">
            <h3>Resolver reporte</h3>
            <div className="d-flex align-items-center gap-2">
              <small className="fw-semibold">Ver contenido</small>
              <button
                className="btn d-flex p-1 btn-dark"
                onClick={() => setOpenContent(true)}
                type="button"
              >
                <FaEye />
              </button>
            </div>
          </div>
          <small className="text-secondary">
            Revise los detalles del reporte y tome una acción
          </small>
          <div>
            <div className="profileData border rounded p-1 my-2 d-flex align-items-center gap-2">
              <Link
                to={`/perfil/${report?.profile?.user?.username}`}
                target="blank"
              >
                <img
                  width={40}
                  height={40}
                  className="rounded-circle"
                  src={`${BASE_URL}/images/${report?.profile?.profilePic}`}
                  alt="Foto del usuario reportado"
                />
              </Link>
              <div className="text-truncate">
                <div className="d-flex gap-2">
                  <span className="fw-semibold">
                    {report?.profile?.names}
                    {report?.profile?.surnames}
                  </span>
                  <small className="text-secondary">
                    @{report?.profile?.user?.username}
                  </small>
                </div>
                <small>{report?.profile?.user?.email}</small>
              </div>
            </div>

            <div className="d-flex flex-column gap-2 mb-2">
              <div>
                <span className="fw-semibold">Descripción:</span>
                <p>{report?.description}</p>
              </div>
              <div>
                <span className="fw-semibold">Razón:</span>
                <p>{report?.reportReason?.reason}</p>
              </div>

              <div>
                <span className="fw-semibold">Reportado el:</span>
                <p>{new Date(report?.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="actions border-0 shadow-none p-0 d-flex flex-column align-items-end"
            >
              <div className="d-flex gap-2 mb-2 w-100">
                <label htmlFor="action" className="w-50">
                  Acciones
                  <select
                    defaultValue={""}
                    className="form-select py-2"
                    {...register("action")}
                  >
                    <option value="" disabled>
                      Seleccione la acción a tomar
                    </option>
                    <option value="ignore">Ignorar reporte</option>
                    <option value="delete">Eliminar contenido</option>
                    <option value="suspend">Suspender usuario</option>
                    <option value="ban">Banear usuario</option>
                  </select>
                </label>
                {action == "suspend" && (
                  <label htmlFor="duration" className="w-50">
                    Hasta
                    <input
                      {...register("duration")}
                      className="form-control py-2 w-100"
                      type="date"
                      placeholder="Días"
                    />
                  </label>
                )}
              </div>
              {action !== "ignore" && action !== "" && (
                <input
                  {...register("reason")}
                  className="form-control m-0 w-100 mb-2"
                  type="text"
                  placeholder="Mensaje para el usuario"
                />
              )}
              {errors.action && noti(errors.action.message, "error")}
              {errors.duration && noti(errors.duration.message, "error")}
              {errors.reason && noti(errors.reason.message, "error")}
              <button className="btn btn-dark" type="submit">
                Enviar
              </button>
            </form>
          </div>
        </div>
      </Dialog>
      <ReportedContentModal
        openReport={openContent}
        setOpenReport={setOpenContent}
        report={report}
      />
    </>
  );
};
