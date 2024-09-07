import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../public/css/associationPanel.module.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { updateAssociationStatus } from "../services/adminServices";
import { useNavigate } from "react-router-dom";
import { getAssociationsSvc } from "../services/adminServices";
import { useNoti } from "../hooks/useNoti";

export const AssociationsPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAssociation, setSelectedAssociation] = useState(null);
  const [associations, setAssociations] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [tab, setTab] = useState("Pendiente");
  const noti = useNoti();

  useEffect(() => {
    const getAssociations = async () => {
      const { data, statusCode } = await getAssociationsSvc(tab);
      if (statusCode === 404) {
        return noti("No se encontraron asociaciones", "warning");
      }
      if (statusCode !== 200) {
        return noti("Error al obtener las solicitudes", "error");
      }
      setAssociations(data);
    };

    getAssociations();
  }, [tab]);

  const handleTabClick = async (tab) => {
    setTab(tab);
    setAssociations([]);
  };

  const acceptRequest = (index) => {
    setAlert({
      show: true,
      message: `Solicitud de ${associations[index].name} aceptada.`,
      type: "success",
    });
    const newAssociations = associations.filter((_, i) => i !== index);
    setAssociations(newAssociations);
  };

  const rejectRequest = (index, reason) => {
    setAlert({
      show: true,
      message: `Solicitud de ${associations[index].name} rechazada. Razón: ${reason}`,
      type: "danger",
    });
    const newAssociations = associations.filter((_, i) => i !== index);
    setAssociations(newAssociations);
  };

  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(
        () => setAlert({ show: false, message: "", type: "" }),
        3000
      );
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleAssociationStatus = async (id, status, message) => {
    if (status === "rechazar" && !message) {
      noti("Por favor, justifica el motivo del rechazo", "warning");
      return;
    }
    await updateAssociationStatus(id, status, message);
  };

  return (
    <div>
      <button
        className="btn btn-success"
        onClick={() => handleTabClick("Pendiente")}
      >
        Pendientes
      </button>
      <button
        className="btn btn-success"
        onClick={() => handleTabClick("Aprobada")}
      >
        Aprobadas
      </button>
      <button
        className="btn btn-success"
        onClick={() => handleTabClick("Rechazada")}
      >
        Rechazadas
      </button>
      <div className={`${styles.mainContainer} d-flex justify-content-center`}>
        <div className="Content">
          <div className="CompanyList">
            <h2>Solicitudes Pendientes</h2>
            <ul className="Companies">
              {associations.map((association, index) => (
                <li
                  key={index}
                  className="Company"
                  onClick={() => {
                    setSelectedAssociation(association);
                  }}
                >
                  <div>
                    <img
                      src={
                        association.profile.profilePic ||
                        "https://via.placeholder.com/40"
                      }
                      alt="Usuario"
                    />
                    <div>
                      <strong>{association.profile.names}</strong>
                      <p className="m-0">{association.profile.user.email}</p>
                    </div>
                  </div>
                  <p className="m-0">{association.company.name}</p>
                  <img
                    src={
                      association.company.logoUrl ||
                      "https://via.placeholder.com/40"
                    }
                    alt="Empresa"
                  />
                </li>
              ))}
            </ul>
          </div>
          {selectedAssociation && (
            <Dialog
              open={Boolean(selectedAssociation)}
              onClose={() => setSelectedAssociation(null)}
              fullWidth
              maxWidth="md"
            >
              <DialogContent className="DetailsModal">
                <div className="DetailSection d-flex">
                  <div className="CompanyDetails">
                    <h4>Datos de la Empresa:</h4>
                    <img
                      height={"100px"}
                      src={
                        selectedAssociation.company.logoUrl ||
                        "https://via.placeholder.com/100"
                      }
                      alt={`${selectedAssociation.company.name} Logo`}
                      className="CompanyLogo"
                    />
                    <p>
                      <strong>Nombre:</strong>{" "}
                      {selectedAssociation.company.name}
                    </p>
                    <p>
                      <strong>Justificación:</strong>{" "}
                      {selectedAssociation.message}
                    </p>
                  </div>
                  <div className="UserDetails">
                    <h4>Solicitante:</h4>
                    <div className="d-flex">
                      <img
                        height={30}
                        src={
                          selectedAssociation.profile.profilePic ||
                          "https://via.placeholder.com/100"
                        }
                        alt="Foto de perfil"
                        className="ProfilePic"
                      />
                      <div className="d-flex flex-column">
                        <span className="fs-5">
                          {selectedAssociation.profile.names}{" "}
                          {selectedAssociation.profile.surnames}
                        </span>
                        <span className={`text-muted ${styles.smallText}`}>
                          {selectedAssociation.profile.user.email}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  color="secondary"
                  onClick={() =>
                    handleAssociationStatus(selectedAssociation.id)
                  }
                >
                  Rechazar
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    handleAssociationStatus(selectedAssociation.id, "Aprobada");
                    noti("Solicitud aprobada", "success");
                    navigate("/panel");
                  }}
                >
                  Aprobar
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
};
