import React, { useContext, useEffect, useState } from "react";
import { likeIdea } from "../services/ideaServices";
import { authContext } from "../../../context/auth/Context";
import { useNoti } from "../../../hooks/useNoti";
import styles from "../../../../public/css/ideaCard.module.css";
import "../../../styles/IdeaModal.css";

export const IdeaCard = ({ idea, onClick }) => {
  const [liked, setLiked] = useState(idea.liked);
  const noti = useNoti();
  const { authState } = useContext(authContext);

  useEffect(() => {
    setLiked(idea.liked);
  }, [idea.liked]);

  const handleLike = async (ideaId) => {
    const res = await likeIdea(ideaId);
    if (res.status !== 201 && res.status !== 200) return;

    res.status === 201
      ? (idea.totalVotes = Number(idea.totalVotes) + 1)
      : (idea.totalVotes = Number(idea.totalVotes) - 1);
    setLiked(!liked);
  };

  return (
    <div
      className={`card h-100 shadow-sm border-0 cursor-pointer ${styles.ideaCard}`}
      onClick={() => onClick(idea)} 
    >
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold text-primary">{idea.title}</h5>
        <p className="card-text text-muted flex-grow-1">
          {idea.description.slice(0, 50) + "..."}
        </p>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button
            className="btn btn-light d-flex"
            onClick={(e) => {
              e.stopPropagation();
              authState.isLogged
                ? handleLike(idea.id)
                : (noti("Debes iniciar sesión para votar", "info"),
                  navigate("/iniciar-sesion"));
            }}
          >
            <span
              className={`material-symbols-outlined ${
                liked ? `${styles.filledIcon} text-warning` : ""
              }`}
            >
              star
            </span>
            <span className="ms-2">{idea.totalVotes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
