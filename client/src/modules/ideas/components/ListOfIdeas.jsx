import React, { useEffect, useState, useContext } from "react";
import { useNoti } from "../../../hooks/useNoti";
import { getIdeas, getIdeasLogged } from "../services/ideaServices";
import { IdeaCard } from "./IdeaCard";
import { authContext } from "../../../context/auth/Context";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { BASE_URL } from "../../../constants/BASE_URL";
import "../../../styles/IdeaModal.css";

export const ListOfIdeas = () => {
  const noti = useNoti();
  const [ideas, setIdeas] = useState([]);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const { authState } = useContext(authContext);

  const fetchIdeas = async () => {
    const res = authState.isLogged ? await getIdeasLogged() : await getIdeas();
    if (res.status !== 200) {
      return noti(res.error || "Error al obtener ideas");
    }
    setIdeas(res.data);
  };

  useEffect(() => {
    fetchIdeas();
  }, [authState.isLogged]);

  const handleShowIdeaDetails = (idea) => {
    setSelectedIdea(idea);
    setShowDialog(true);
  };

  const handleCloseDialog = () => setShowDialog(false);

  return (
    <div
      className="ideas-container"
      style={{ marginLeft: "100px", padding: "20px" }}
    >
      <h2 className="ideas-title" style={{ marginBottom: "20px" }}>
        Proyectos Nuevos
      </h2>

      <div className="ideas-list" style={{ display: "block", gap: "20px" }}>
        {ideas.length > 0 ? (
          ideas.map((idea) => (
            <div
              key={idea.id}
              className="idea-card-container"
              style={{ marginBottom: "20px" }}
            >
              <IdeaCard
                idea={idea}
                onClick={() => handleShowIdeaDetails(idea)}
              />
            </div>
          ))
        ) : (
          <p>No hay ideas disponibles.</p>
        )}
      </div>

      <Dialog
        open={showDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle className="fw-bold fs-4 text-primary text-center mb-3">
          {selectedIdea?.title || "Título de la idea"}
        </DialogTitle>
        <DialogContent>
          <div className="creator-info mb-5">
            <h5 className="fw-bold text-dark">Creado por</h5>
            <div className="d-flex align-items-center mt-3 p-3 border rounded shadow-sm">
              <img
                className="me-3 rounded-circle"
                src={
                  selectedIdea?.profile?.profilePic
                    ? `${BASE_URL}/images/${selectedIdea.profile.profilePic}`
                    : "default-profile.png"
                }
                alt="Foto de perfil"
                height={50}
                width={50}
              />
              <div className="flex-grow-1">
                <h6 className="fw-bold fs-5 mb-1">
                  {selectedIdea?.profile?.names || "Nombre"}{" "}
                  {selectedIdea?.profile?.surnames || "Apellido"}
                </h6>
                <p className="text-secondary mb-1">
                  @{selectedIdea?.profile?.user?.username || "username"}
                </p>
              </div>
              <Link
                to={`/perfil/${selectedIdea?.profile?.user?.username || ""}`}
                className="btn btn-outline-info btn-sm"
              >
                Ver perfil
              </Link>
            </div>
          </div>

          <div className="idea-details">
            <h5 className="fw-bold text-dark mb-3">Detalles del Proyecto</h5>
            <div className="ps-3 border-start border-2">
              <p className="mb-3">
                <strong className="fw-bold">Descripción:</strong>{" "}
                <span style={{ color: "#212529" }}>
                  {selectedIdea?.description || "Sin descripción"}
                </span>
              </p>
              <p className="mb-3">
                <strong className="fw-bold">Categoría:</strong>{" "}
                <span style={{ color: "#212529" }}>
                  {selectedIdea?.category || "Sin categoría"}
                </span>
              </p>
              <p className="mb-3">
                <strong className="fw-bold">Objetivos:</strong>{" "}
                <span style={{ color: "#212529" }}>
                  {selectedIdea?.objectives || "Sin objetivos"}
                </span>
              </p>
              <p className="mb-3">
                <strong className="fw-bold">Justificación:</strong>{" "}
                <span style={{ color: "#212529" }}>
                  {selectedIdea?.justification || "Sin justificación"}
                </span>
              </p>
              <p className="mb-3">
                <strong className="fw-bold">Tecnologías:</strong>{" "}
                <span style={{ color: "#212529" }}>
                  {selectedIdea?.technologies || "Sin tecnologías"}
                </span>
              </p>
              <p className="mb-3">
                <strong className="fw-bold">Beneficiarios:</strong>{" "}
                <span style={{ color: "#212529" }}>
                  {selectedIdea?.beneficiaries || "Sin beneficiarios"}
                </span>
              </p>
            </div>
          </div>

          {selectedIdea?.attachments?.length > 0 && (
            <div className="attachments mt-5">
              <h5 className="fw-bold text-dark mb-3">Adjuntos</h5>
              <Carousel className="shadow-sm rounded">
                {selectedIdea.attachments.map((attachment, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={`${BASE_URL}/images/${attachment.url}`}
                      alt={`Adjunto ${index + 1}`}
                      height={400}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="secondary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
