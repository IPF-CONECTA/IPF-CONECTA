import { Dialog } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useNoti } from "../../../hooks/useNoti";

export const ReportModal = ({
  openModal,
  setOpenModal,
  reportableId,
  reportable,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const noti = useNoti();
  const onSubmit = (data) => {
    noti("Reporte enviado", "info");
    reset();
    setOpenModal(false);
  };
  return (
    <Dialog
      open={Boolean(openModal)}
      maxWidth="xs"
      fullWidth
      onClose={() => setOpenModal(false)}
      onClick={(e) => e.stopPropagation()}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex flex-column p-3 border-0"
      >
        <span className="fs-4 mb-2 fw-semibold">
          Reportar {reportable || ""}
        </span>
        <select
          {...register("reason", {
            required: "Este campo es obligatorio",
          })}
          className="form-select mb-2"
          name="reason"
          defaultValue={""}
        >
          <option value="" disabled>
            Razón
          </option>
          <option value="1">Contenido inapropiado</option>
          <option value="2">Contenido violento</option>
          <option value="3">Contenido sexual</option>
          <option value="4">Contenido falso</option>
          <option value="5">Contenido ofensivo</option>
        </select>
        {errors.reason && (
          <span className="text-danger">{errors.reason.message}</span>
        )}
        <div className="form-floating mb-2">
          <input
            type="text"
            {...register("description", {
              required: "Este campo es obligatorio",
            })}
            className="form-control"
          ></input>
          <label for="floatingTextarea2">Describe el problema</label>
        </div>
        {errors.description && (
          <span className="text-danger">{errors.description.message}</span>
        )}
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary">
            Reportar
          </button>
        </div>
      </form>
    </Dialog>
  );
};
