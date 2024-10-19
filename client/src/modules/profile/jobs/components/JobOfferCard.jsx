import DOMPurify from "dompurify";
import { BASE_URL } from "../../../../constants/BASE_URL";
import { getFullDate } from "../../../../helpers/getTime";
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

export const JobOfferCard = ({ jobOffer, description, own }) => {
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
    <div>
      <div className="p-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between w-100">
            <div>
              <h5>{jobOffer.company.name}</h5>

              <img
                src={`${BASE_URL}/logoUrl/${jobOffer.company.logoUrl}`}
                crossOrigin="anonymous"
                height={50}
              />
            </div>
            {own && (
              <>
                <button className="btn" onClick={handleClickOpen}>
                  <span className="material-symbols-outlined fs-3">delete</span>
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
                    <button onClick={handleClose} color="primary">
                      Cancelar
                    </button>
                    <button onClick={handleDelete} color="primary" autoFocus>
                      Eliminar
                    </button>
                  </DialogActions>
                </Dialog>
              </>
            )}
          </div>
          <div className="card-body">
            <h5 className="card-title">{jobOffer.title}</h5>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(shortdescription),
              }}
            ></div>
            <p className="card-text">{getFullDate(jobOffer.createdAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
