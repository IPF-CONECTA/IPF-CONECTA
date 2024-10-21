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

export const JobOfferCard = ({ jobOffer, description, own, edit }) => {
  const noti = useNoti();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const shortdescription =
    description?.length > 40
      ? `${description.substring(0, 40)}...`
      : description;

  const handleDelete = async () => {
    try {
      jobsServices.deleteJob(jobOffer.id);
      handleClose();
      noti("Oferta eliminada", "success");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex justify-content-between w-100 py-2">
      <div className="d-flex">
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
      {own && edit && (
        <>
          <button className="btn" onClick={handleClickOpen}>
            <span className="material-symbols-outlined text-dark-emphasis">
              edit
            </span>
          </button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Eliminar oferta"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                ¿Estás seguro de que deseas eliminar esta oferta?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <button
                className="btn btn-outline-warning"
                onClick={handleClose}
                color="primary"
              >
                Cancelar
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={handleDelete}
                color="primary"
                autoFocus
              >
                Eliminar
              </button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
};
