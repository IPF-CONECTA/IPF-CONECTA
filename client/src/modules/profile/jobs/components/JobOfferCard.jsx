import DOMPurify from "dompurify";
import { BASE_URL } from "../../../../constants/BASE_URL";
import { getFullDate, getTime } from "../../../../helpers/getTime";
import { jobsServices } from "../services/jobsServices";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { useNoti } from "../../../../hooks/useNoti";
import styles from "../../../../../public/css/jobProfileCard.module.css";

import { JobDetails } from "../../../recruiter/job/components/JobDetails";
import { CreateJobForm } from "../../../profile/jobs/components/CreateJobForm"; // Asegúrate de tener este componente para la edición

export const JobOfferCard = ({ jobOffer, description, own, edit }) => {
  const noti = useNoti();
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const handleClickOpen = (type) => {
    setModalType(type);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setModalType("");
  };
  const handleEditClick = () => {
    handleClickOpen("edit");
  };
  const handleDeleteClick = () => {
    handleClickOpen("delete");
  };
  const handleJobClick = () => {
    handleClickOpen("details");
  };
  const handleDelete = async () => {
    try {
      await jobsServices.deleteJob(jobOffer.id); // Asegúrate de que esta función esté bien definida
      handleClose();
      noti.success("Oferta eliminada con éxito");
    } catch (error) {
      console.log(error);
      noti.error("Error al eliminar la oferta");
    }
  };

  const shortdescription =
    description?.length > 40
      ? `${description.substring(0, 40)}...`
      : description;

  return (
    <div className="d-flex justify-content-between w-100 bg-body-tertiary">
      <li className=" py-2 d-flex w-100">
        <div
          className="d-flex"
          onClick={handleJobClick}
          style={{ cursor: "pointer" }}
        >
          <img
            src={`${BASE_URL}/logoUrl/${jobOffer.company.logoUrl}`}
            crossOrigin="anonymous"
            height={45}
            className="me-2"
          />
          <div className="d-flex flex-column">
            <div className="d-flex gap-3">
              <span className="fw-semibold">{jobOffer.title}</span>
              <span
                className={`d-flex align-items-center text-secondary ${styles.smallText}`}
              >
                {getFullDate(jobOffer.createdAt)}
              </span>
            </div>

            <span className={`${styles.smallText} text-secondary`}>
              {jobOffer.company.name}
            </span>
            <div
              className={` ${styles.smallText}`}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(shortdescription),
              }}
            ></div>
          </div>
        </div>
      </li>

      {own && (
        <div className="d-flex align-items-center">
          <button className="btn" onClick={handleEditClick}>
            <span className="material-symbols-outlined text-dark-emphasis">
              edit
            </span>
          </button>
        </div>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        fullWidth
        maxWidth="md"
      >
        {modalType === "details" && (
          <>
            <DialogTitle id="dialog-title">Detalles de la oferta</DialogTitle>
            <DialogContent>
              <JobDetails jobId={jobOffer.id} />
            </DialogContent>
            <DialogActions>
              <button className="btn btn-primary" onClick={handleClose}>
                Cerrar
              </button>
            </DialogActions>
          </>
        )}

        {modalType === "edit" && (
          <>
            <DialogTitle id="dialog-title">Editar oferta</DialogTitle>
            <DialogContent>
              <CreateJobForm jobOffer={jobOffer} />{" "}
            </DialogContent>
            <DialogActions>
              <button className="btn btn-primary" onClick={handleClose}>
                Cerrar
              </button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};
