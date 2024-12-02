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
        className="idea-modal"
      >
        <DialogTitle className="modal-title">{selectedIdea?.title}</DialogTitle>
        <DialogContent>
          <div className="modal-body-container">
            <div className="modal-text-content">
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
              <div className="modal-carousel-container">
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
