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
    <div className="ideas-container" style={{ marginLeft: "100px", padding: "20px" }}>
      <h2 className="ideas-title" style={{ marginBottom: "20px" }}>Proyectos Nuevos</h2>

      <div className="ideas-list" style={{ display: "block", gap: "20px" }}>
        {ideas.length > 0 ? (
          ideas.map((idea) => (
            <div key={idea.id} className="idea-card-container" style={{ marginBottom: "20px" }}>
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
        className="idea-modal"
      >
        <DialogTitle className="modal-title">{selectedIdea?.title}</DialogTitle>
        <DialogContent>
          <div className="modal-body-container">
            <div className="modal-text-content" style={{ marginBottom: "20px" }}>
              <p>
                <strong>Descripción:</strong> {selectedIdea?.description}
              </p>
              <p>
                <strong>Categoría:</strong> {selectedIdea?.category}
              </p>
              <p>
                <strong>Objetivos:</strong> {selectedIdea?.objectives}
              </p>
              <p>
                <strong>Justificación:</strong> {selectedIdea?.justification}
              </p>
              <p>
                <strong>Tecnologías:</strong> {selectedIdea?.technologies}
              </p>
              <p>
                <strong>Beneficiarios:</strong> {selectedIdea?.beneficiaries}
              </p>
            </div>

            {selectedIdea?.attachments?.length > 0 && (
              <div className="modal-carousel-container" style={{ marginTop: "20px" }}>
                <Carousel className="modal-carousel">
                  {selectedIdea.attachments.map((attachment, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="modal-carousel-image"
                        src={`${BASE_URL}/images/${attachment.url}`}
                        alt={`Attachment ${index + 1}`}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            color="primary"
            className="close-button"
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
