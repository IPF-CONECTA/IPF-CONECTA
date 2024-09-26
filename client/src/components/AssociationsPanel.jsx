import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import styles from "../../public/css/associationPanel.module.css";
import {
  updateAssociationStatus,
  getAssociationsSvc,
} from "../services/adminServices";
import { useNavigate } from "react-router-dom";
import { useNoti } from "../hooks/useNoti";
import { useForm } from "react-hook-form";
import axios from "axios";
import { authService } from "../services/authService";
import DOMPurify from "dompurify";
import stripHtml from "../helpers/stripHtml";
const BASE_URL = "http://localhost:4000/logoUrl/";

export const AssociationsPanel = () => {
  const [selectedAssociation, setSelectedAssociation] = useState(null);
  const [selectedAssociationId, setSelectedAssociationId] = useState(null);
  const [associations, setAssociations] = useState([]);
  const [tab, setTab] = useState("Pendiente");
  const [justification, setJustification] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showFullMessage, setShowFullMessage] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const noti = useNoti();

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
  const getShortDescription = (description) => {
    const text = stripHtml(description);
    return text.length > 100 ? text.substring(0, 100) + "..." : text;
  };
  useEffect(() => {
    console.log(selectedAssociation);
  }, [selectedAssociation]);

  const handleTabClick = (tab) => {
    setTab(tab);
    setAssociations([]);
  };

  useEffect(() => {
    const getAssociationInfo = async () => {
      if (selectedAssociationId) {
        try {
          const res = await axios.get(
            `http://localhost:4000/admin/get-association/${selectedAssociationId}`,
            {
              headers: {
                Authorization: `Bearer ${authService.getToken()}`,
              },
            }
          );
          setSelectedAssociation(res.data);
        } catch (error) {
          noti(error.response.data, "error");
        }
      }
    };
    getAssociationInfo();
  }, [selectedAssociationId]);
  const handleAssociationStatus = async (id, status, justification) => {
    console.log(justification);
    if (status === "rechazar" && justification.length < 1) {
      return noti("Por favor, justifica el motivo del rechazo", "warning");
    }
    const res = await updateAssociationStatus(id, status, justification);
    console.log(res);
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
            {associations.map((association) => (
              <li
                key={association.id}
                className="list-group-item d-flex justify-content-between align-items-center"
                onClick={() => setSelectedAssociationId(association.id)}
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
                    <p className="mb-0 text-muted">
                      {association.profile.user.username}
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
          onClose={() => {
            setSelectedAssociation(null);
            setSelectedAssociationId(null);
          }}
          fullWidth
          maxWidth="md"
        >
          <DialogContent>
            <div className="d-flex">
              <div className="me-3 w-75 border rounded p-2">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <img
                      crossOrigin="anonymous"
                      src={
                        `${BASE_URL}${selectedAssociation.company.logoUrl}` ||
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
                  <span className="fw-semibold border rounded-5 px-2 shadow-sm">
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
                    {selectedAssociation.company.companyUbications[0].address}
                  </span>
                </p>
              </div>
              <div className="border rounded p-2 w-25">
                <h6>Solicitante:</h6>
                <div className="d-flex align-items-center">
                  <div>
                    <div className="d-flex">
                      <img
                        src={
                          selectedAssociation.profile.profilePic ||
                          "https://via.placeholder.com/100"
                        }
                        alt={`${selectedAssociation.profile.names} Logo`}
                        className="rounded-circle me-2"
                        width={40}
                        height={40}
                      />
                      <div>
                        <div className="fw-bold">
                          <span className="me-1">
                            {selectedAssociation.profile.names}
                          </span>
                          <span>{selectedAssociation.profile.surnames}</span>
                        </div>
                        <span>
                          @{selectedAssociation.profile.user.username}
                        </span>
                      </div>
                    </div>
                    <span className="text-muted">
                      {selectedAssociation.profile.user.email}
                    </span>
                    <p className="mb-0">
                      <span className="fw-semibold">Justificación:</span>{" "}
                      {selectedAssociation.length > 60
                        ? selectedAssociation.message.substring(0, 60) + "..."
                        : selectedAssociation.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
          {selectedAssociation.status == "Pendiente" && (
            <DialogActions>
              <form
                className="shadow-none border-0 p-0 mb-2 ms-3 mw-100"
                onSubmit={handleSubmit(handleAssociationStatus)}
              >
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Justificación (solo para rechazar)"
                  {...register("justification", { required: true })}
                />
                {errors.justification && (
                  <span className="text-danger">
                    Este campo es requerido para rechazar
                  </span>
                )}
              </form>
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
          )}
        </Dialog>
      )}
    </div>
  );
};
