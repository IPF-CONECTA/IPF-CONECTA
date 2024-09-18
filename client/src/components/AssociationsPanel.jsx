import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import {
  updateAssociationStatus,
  getAssociationsSvc,
} from "../services/adminServices";
import { useNavigate } from "react-router-dom";
import { useNoti } from "../hooks/useNoti";

const BASE_URL = "http://localhost:4000/logoUrl/";

export const AssociationsPanel = () => {
  const [selectedAssociation, setSelectedAssociation] = useState(null);
  const [associations, setAssociations] = useState([]);
  const [tab, setTab] = useState("Pendiente");
  const [justification, setJustification] = useState("");
  const noti = useNoti();
  const navigate = useNavigate();

  useEffect(() => {
    const getAssociations = async () => {
      const { data, statusCode } = await getAssociationsSvc(tab);
      if (statusCode === 404) {
        noti("No se encontraron asociaciones", "warning");
      } else if (statusCode !== 200) {
        noti("Error al obtener las solicitudes", "error");
      } else {
        setAssociations(data);
      }
    };

    getAssociations();
  }, [tab]);

  const handleTabClick = (tab) => {
    const handleTabClick = (tab) => {
      setTab(tab);
      setAssociations([]);
    };

    const handleAssociationStatus = async (id, status, message) => {
      if (status === "rechazar" && !message) {
        noti("Por favor, justifica el motivo del rechazo", "warning");
        return;
      }
      await updateAssociationStatus(id, status, message);
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

    const acceptRequest = (index) => {
      setAlert({
        show: true,
        message: `Solicitud de ${associations[index].company.name} aceptada.`,
        type: "success",
      });
      const newAssociations = associations.filter((_, i) => i !== index);
      setAssociations(newAssociations);
    };

    const rejectRequest = (index, reason) => {
      setAlert({
        show: true,
        message: `Solicitud de ${associations[index].company.name} rechazada. Razón: ${reason}`,
        type: "danger",
      });
      const newAssociations = associations.filter((_, i) => i !== index);
      setAssociations(newAssociations);
    };

    return (
      <div className="container mt-4">
        <div className="btn-group mb-3" role="group">
          <button
            className={`btn btn-outline-success ${
              tab === "Pendiente" ? "active" : ""
            }`}
            onClick={() => handleTabClick("Pendiente")}
          >
            Pendientes
          </button>
          <button
            className={`btn btn-outline-success ${
              tab === "Aprobada" ? "active" : ""
            }`}
            onClick={() => handleTabClick("Aprobada")}
          >
            Aprobadas
          </button>
          <button
            className={`btn btn-outline-success ${
              tab === "Rechazada" ? "active" : ""
            }`}
            onClick={() => handleTabClick("Rechazada")}
          >
            Rechazadas
          </button>
        </div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Solicitudes {tab}</h5>
            <ul className="list-group">
              {associations.map((association) => (
                <li
                  key={association.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={() => setSelectedAssociation(association)}
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={
                        association.profile.profilePic ||
                        "https://via.placeholder.com/40"
                      }
                      alt="Usuario"
                      className="rounded-circle me-2"
                      style={{ width: "40px", height: "40px" }}
                    />
                    <div>
                      <strong>{association.profile.names}</strong>
                      <p className="mb-0 text-muted">
                        {association.profile.user.email}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <p className="mb-0">{association.company.name}</p>
                    <img
                      src={
                        `${BASE_URL}${association.company.logoUrl}` ||
                        "https://via.placeholder.com/40"
                      }
                      alt="Empresa"
                      crossOrigin="anonymous"
                      className="ms-2"
                      style={{ width: "40px", height: "40px" }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {selectedAssociation && (
          <Dialog
            open={Boolean(selectedAssociation)}
            onClose={() => setSelectedAssociation(null)}
            fullWidth
            maxWidth="md"
          >
            <DialogContent>
              <div className="d-flex">
                <div className="me-3">
                  <img
                    src={
                      selectedAssociation.company.logoUrl ||
                      "https://via.placeholder.com/100"
                    }
                    alt={`${selectedAssociation.company.name} Logo`}
                    className="img-fluid"
                    style={{ maxHeight: "100px" }}
                  />
                  <h6 className="mt-2">Datos de la Empresa:</h6>
                  <p>
                    <strong>Nombre:</strong> {selectedAssociation.company.name}
                  </p>
                  <p>
                    <strong>Justificación:</strong>{" "}
                    {selectedAssociation.message}
                  </p>
                </div>
                <div>
                  <h6>Solicitante:</h6>
                  <div className="d-flex align-items-center">
                    <img
                      src={
                        selectedAssociation.profile.profilePic ||
                        "https://via.placeholder.com/100"
                      }
                      alt="Foto de perfil"
                      className="rounded-circle me-2"
                      style={{ width: "30px", height: "30px" }}
                    />
                    <div>
                      <span className="fw-bold">
                        {selectedAssociation.profile.names}{" "}
                        {selectedAssociation.profile.surnames}
                      </span>
                      <br />
                      <span className="text-muted">
                        {selectedAssociation.profile.user.email}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <textarea
                className="form-control"
                rows={3}
                placeholder="Justificación (solo para rechazar)"
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                disabled={selectedAssociation.status === "Aprobada"}
              />
              <Button
                color="secondary"
                onClick={() =>
                  handleAssociationStatus(selectedAssociation.id, "Rechazada")
                }
              >
                Rechazar
              </Button>
              <Button
                color="primary"
                onClick={() =>
                  handleAssociationStatus(selectedAssociation.id, "Aprobada")
                }
              >
                Aprobar
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    );
  };
};
