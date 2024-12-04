import React, { useContext, useEffect, useState } from "react";
import { IdeaCard } from "./IdeaCard";
import { authContext } from "../../../context/auth/Context";
import {
  getRankingIdeas,
  getRankingIdeasLogged,
} from "../services/ideaServices";
import { useNoti } from "../../../hooks/useNoti";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import styles from "../../../../public/css/ranking.module.css";
import { BASE_URL } from "../../../constants/BASE_URL";
import { Link } from "react-router-dom";

export const RankingList = () => {
  const [ideas, setIdeas] = useState([]);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const { authState } = useContext(authContext);
  const noti = useNoti();

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const fetchRanking = async () => {
      const res = authState.isLogged
        ? await getRankingIdeasLogged()
        : await getRankingIdeas();
      if (res.status !== 200)
        return noti(res.error || "Hubo un error", "error");
      setIdeas(res.data);
    };

    fetchRanking();

    return () => {
      document.head.removeChild(link);
    };
  }, [authState]);

  const handleShowIdeaDetails = (idea) => {
    setSelectedIdea(idea);
    setShowDialog(true);
  };

  const handleCloseDialog = () => setShowDialog(false);

  return (
    <div className="ranking-container">
      <div className="container rounded w-75">
        <div className="row row-cols-1 g-4">
          {ideas.map((idea, index) => (
            <div className="col" key={idea.id}>
              <div className={`position-relative rounded shadow-sm`}>
                <span
                  className={`position-absolute top-0 start-0 translate-middle badge rounded-pill ${
                    styles.placeIcon
                  } ${
                    index === 0
                      ? "bg-warning text-dark"
                      : index === 1
                      ? "bg-secondary"
                      : index === 2
                      ? `${styles.thirdPlace}`
                      : "bg-success text-white"
                  }`}
                >
                  {index + 1}
                </span>
                <IdeaCard
                  idea={idea}
                  onClick={() => handleShowIdeaDetails(idea)}
                />
              </div>
            </div>
          ))}
        </div>
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
