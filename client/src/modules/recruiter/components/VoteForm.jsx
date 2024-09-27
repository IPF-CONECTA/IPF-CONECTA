import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { authContext } from "../context/auth/Context";
import { useNavigate } from "react-router-dom";
import "../../public/vote.css";
import { authService } from "../services/authService";

const ProjectList = () => {
  const { authState } = useContext(authContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [ideas, setIdeas] = useState([]);

  const fetchIdeas = async () => {
    try {
      const response = await axios.get("http://localhost:4000/idea", {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      });
      setIdeas(
        response.data.map((idea) => ({
          ...idea,
          userVote: idea.userVote || 0,
        }))
      );
    } catch (error) {
      enqueueSnackbar("Error al obtener ideas", { variant: "error" });
      console.error("Error fetching ideas:", error);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  const handleToggleVote = async (ideaId) => {
    try {
      const profileId = authState?.user?.profile?.id;
      if (!profileId) throw new Error("User ID no encontrado");

      const idea = ideas.find((idea) => idea.id === ideaId);

      if (idea.userVote > 0) {
        const response = await axios.delete(
          `http://localhost:4000/vote/${ideaId}`,
          {
            headers: {
              Authorization: `Bearer ${authService.getToken()}`,
            },
          }
        );
        setIdeas((prevIdeas) =>
          prevIdeas.map((idea) =>
            idea.id === ideaId
              ? { ...idea, totalVotes: response.data.totalVotes, userVote: 0 }
              : idea
          )
        );
        enqueueSnackbar("Voto retirado", { variant: "info" });
      } else {
        const response = await axios.post(
          "http://localhost:4000/vote",
          {
            profileId: profileId,
            ideaId: ideaId,
          },
          {
            headers: {
              Authorization: `Bearer ${authService.getToken()}`,
            },
          }
        );
        setIdeas((prevIdeas) =>
          prevIdeas.map((idea) =>
            idea.id === ideaId
              ? { ...idea, totalVotes: response.data.totalVotes, userVote: 1 }
              : idea
          )
        );
        enqueueSnackbar("Voto registrado", { variant: "success" });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.message || "Error desconocido";
      enqueueSnackbar(`Error: ${errorMessage}`, { variant: "error" });
      console.error("Error al votar o retirar voto:", error);
    }
  };

  const handleIdeaClick = (ideaId) => {
    navigate(`/idea/${ideaId}`);
  };

  return (
    <div className="project-list">
      <h2 className="section-title">Ideas Innovadoras</h2>
      <div className="project-grid">
        {ideas.map((idea) => (
          <div
            key={idea.id}
            className="project-card"
            onClick={() => handleIdeaClick(idea.id)}
          >
            <h3 className="project-title">{idea.title}</h3>
            <p className="project-description">{idea.description}</p>
            <div className="voting-buttons-container">
              <button
                className={`vote-button ${idea.userVote > 0 ? "voted" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleVote(idea.id);
                }}
              >
                <span className="material-icons">
                  {idea.userVote > 0 ? "favorite" : "favorite_border"}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
