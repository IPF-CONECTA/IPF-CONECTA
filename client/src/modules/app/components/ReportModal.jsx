import { Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNoti } from "../../../hooks/useNoti";
import { getReportReasons, report } from "../services/reportServices";

export const ReportModal = ({
  openModal,
  setOpenModal,
  reportableId,
  reportableType,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [reportReasons, setReportReasons] = useState([]);
  const [loading, setLoading] = useState(false);
  const noti = useNoti();
  useEffect(() => {
    const fetchReportReasons = async () => {
      const res = await getReportReasons();
      console.log(res);
      if (res.status == 200) {
        return setReportReasons(res.data);
      }
    };
    fetchReportReasons();
  }, [openModal]);

  const onSubmit = async (data) => {
    setLoading(true);
    await report(data, reportableType, reportableId);
    setLoading(false);
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
        <span className="fs-4 mb-2 fw-semibold">Reportar</span>
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
          {reportReasons.map((reason) => (
            <option value={reason.id}>{reason.reason}</option>
          ))}
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
          <button disabled={loading} type="submit" className="btn btn-primary">
            Reportar
          </button>
        </div>
      </form>
    </Dialog>
  );
};
