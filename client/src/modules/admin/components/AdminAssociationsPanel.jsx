import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../../../public/css/associationPanel.module.css";
import {
  updateAssociationStatus,
  getAssociationsSvc,
} from "../services/adminServices";
import { useNoti } from "../../../hooks/useNoti";
import axios from "axios";
import { authService } from "../../auth/services/authService";
import DOMPurify from "dompurify";
import stripHtml from "../../../helpers/stripHtml";
import { BASE_URL } from "../../../constants/BASE_URL";

export const AdminAssociationsPanel = () => {
  const [selectedAssociation, setSelectedAssociation] = useState(null);
  const [selectedAssociationId, setSelectedAssociationId] = useState(null);
  const [associations, setAssociations] = useState([]);
  const [tab, setTab] = useState("Pendiente");
  const [justification, setJustification] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showFullMessage, setShowFullMessage] = useState(false);
  const noti = useNoti();

  useEffect(() => {
    const getAssociations = async () => {
      const res = await getAssociationsSvc(tab);
      if (res.status === 404) {
        noti("No se encontraron asociaciones", "warning");
      } else if (res.status !== 200) {
        noti("Error al obtener las solicitudes", "error");
      } else {
        setAssociations(res.data);
      }
    };

    getAssociations();
  }, [tab]);
  const getShortDescription = (description) => {
    const text = stripHtml(description);
    return text.length > 100 ? text.substring(0, 100) + "..." : text;
  };

  const handleTabClick = (tab) => {
    setTab(tab);
    setAssociations([]);
  };

  useEffect(() => {
    const getAssociationInfo = async () => {
      if (selectedAssociationId) {
        try {
          const res = await axios.get(
            `${BASE_URL}/admin/get-association/${selectedAssociationId}`,
            {
              headers: {
                Authorization: `Bearer ${authService.getToken()}`,
              },
            }
          );
          setSelectedAssociation(res.data);
        } catch (error) {
          console.log(error);
          noti(error.response.data, "error");
        }
      }
    };
    getAssociationInfo();
  }, [selectedAssociationId]);
  const handleAssociationStatus = async (id, status, justification) => {
    if (status === "Rechazada" && justification.length < 1) {
      return noti("Por favor, justifica el motivo del rechazo", "warning");
    } else if (status === "Aprobada") {
      justification = null;
    }
    const res = await updateAssociationStatus(id, status, justification);
    if (res.status !== 201) {
      return res.error.length > 1
        ? res.error.map((error) => noti(error.msg, "danger"))
        : noti(res.error, "danger");
    }
    setJustification("");
    noti("Solicitud actualizada", "success");
    setSelectedAssociation(null);
    const newAssociations = associations.filter(
      (association) => association.id !== id
    );
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
            {associations?.map((association) => (
              <li
                key={association.id}
                className="list-group-item d-flex justify-content-between align-items-center"
                onClick={() => setSelectedAssociationId(association.id)}
              >
                <div className="d-flex align-items-center">
                  <img
                    src={`${BASE_URL}/images/${association.profile.profilePic}`}
                    alt="Usuario"
                    className="rounded-circle me-2"
                    style={{ width: "40px", height: "40px" }}
                  />
                  <div>
                    <strong>{association.profile.names}</strong>
                    <p className="mb-0 text-muted">
                      {association.profile.user.email}
                    </p>
                    <p className="mb-0 text-muted">
                      {association.profile.user.username}
                    </p>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <p className="mb-0">{association.company.name}</p>
                  <img
                    src={
                      `${BASE_URL}/logoUrl/${association.company.logoUrl}` ||
                      "https://via.placeholder.com/40"
                    }
                    alt="Empresa"
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
          onClose={() => {
            setSelectedAssociation(null);
            setSelectedAssociationId(null);
          }}
          fullWidth
          maxWidth="lg"
        >
          <DialogContent>
            <div className="d-flex">
              <div className="me-3 w-75 border rounded p-2">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex align-items-center">
                    <img
                      src={
                        `${BASE_URL}/logoUrl/${selectedAssociation.company.logoUrl}` ||
                        "https://via.placeholder.com/100"
                      }
                      alt={`${selectedAssociation.company.name} Logo`}
                      className="img-fluid me-2"
                      style={{ maxHeight: "40px" }}
                    />
                    <div className="d-flex flex-column">
                      <span className="fs-4 fw-semibold me-2">
                        {selectedAssociation.company.name}
                      </span>
                      <span className={styles.smallText}>
                        {selectedAssociation.company.country.name}{" "}
                        {selectedAssociation.company.country.emoji}
                      </span>
                    </div>
                  </div>
                  <span className="w-25">
                    {selectedAssociation.company.companyIndustry.name}
                  </span>
                  <span>
                    {selectedAssociation.company.cantEmployees} empleados
                  </span>
                  <span className="fw-semibold border rounded-5 px-2 py-1 bg-body-tertiary">
                    {selectedAssociation.status.toUpperCase()}
                  </span>
                </div>
                <span className="mt-2 fw-semibold">Descripción:</span>
                <div
                  dangerouslySetInnerHTML={{
                    __html: showFullDescription
                      ? DOMPurify.sanitize(
                          selectedAssociation.company.description
                        )
                      : DOMPurify.sanitize(
                          getShortDescription(
                            selectedAssociation.company.description
                          )
                        ),
                  }}
                ></div>
                {stripHtml(selectedAssociation.company.description).length >
                  100 && (
                  <Button
                    className="ps-2"
                    onClick={() => setShowFullDescription(!showFullDescription)}
                  >
                    {showFullDescription ? "Mostrar menos" : "Mostrar más"}
                  </Button>
                )}
                <p>
                  <span className="fw-semibold">Sede principal: </span>
                  <span>
                    {selectedAssociation.company.companyLocations[0].address}
                  </span>
                </p>
              </div>
              <div className="border rounded p-2 w-25">
                <span className="fw-semibold">Solicitante:</span>{" "}
                {selectedAssociation.profile.user.email}
                <div className="d-flex align-items-center mt-2">
                  <div>
                    <div className="d-flex mb-2">
                      <img
                        src={`${BASE_URL}/images/${selectedAssociation.profile.profilePic}`}
                        alt={`${selectedAssociation.profile.names} Logo`}
                        className="rounded-circle me-2"
                        width={40}
                        height={40}
                      />
                      <div className="d-flex flex-column">
                        <div className="fw-bold">
                          <span className="me-1">
                            {selectedAssociation.profile.names}
                          </span>
                          <span>{selectedAssociation.profile.surnames}</span>
                        </div>
                        <span className={styles.smallText}>
                          @{selectedAssociation.profile.user.username}
                        </span>
                      </div>
                    </div>

                    <p className="mb-0">
                      <span className="fw-semibold">Mensaje:</span>{" "}
                      {showFullMessage
                        ? selectedAssociation.message
                        : selectedAssociation.message.substring(0, 60) + "..."}
                    </p>
                    {selectedAssociation.message.length > 60 && (
                      <Button
                        onClick={() => setShowFullMessage(!showFullMessage)}
                      >
                        {showFullMessage ? "Mostrar menos" : "Mostrar más"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
          {selectedAssociation.status == "Pendiente" && (
            <DialogActions className="p-0 m-4 mt-0">
              <form className="shadow-none border-0 p-0 mw-100 d-flex">
                <div className="w-75 me-3">
                  <textarea
                    className="form-control w-100"
                    rows={3}
                    placeholder="Justificación (solo para rechazar)"
                    onChange={(e) => {
                      setJustification(e.target.value);
                    }}
                  />
                </div>
                <div className="w-25 d-flex flex-column align-items-center">
                  <button
                    type="button"
                    className="btn btn-outline-danger w-50 fw-semibold mb-2"
                    onClick={() =>
                      handleAssociationStatus(
                        selectedAssociation.id,
                        "Rechazada",
                        justification
                      )
                    }
                  >
                    Rechazar
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-success w-50 fw-semibold"
                    onClick={() =>
                      handleAssociationStatus(
                        selectedAssociation.id,
                        "Aprobada"
                      )
                    }
                  >
                    Aprobar
                  </button>
                </div>
              </form>
            </DialogActions>
          )}
        </Dialog>
      )}
    </div>
  );
};
