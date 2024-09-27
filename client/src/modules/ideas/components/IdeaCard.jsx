import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { likeIdea } from "../services/ideaServices";
import { authContext } from "../../../context/auth/Context";
import { useNoti } from "../../../hooks/useNoti";
import styles from "../../../../public/css/ideaCard.module.css";
export const IdeaCard = ({ idea }) => {
  const [liked, setLiked] = useState(idea.liked);
  const navigate = useNavigate();
  const noti = useNoti();
  const { authState } = useContext(authContext);

  useEffect(() => {
    console.log(idea);
    setLiked(idea.liked);
  }, [idea.liked]);

  const handleLike = async (ideaId) => {
    const res = await likeIdea(ideaId);
    if (res.status !== 201 && res.status !== 200) {
      return;
    }
    res.status == 201
      ? (idea.totalVotes = Number(idea.totalVotes) + 1)
      : (idea.totalVotes = Number(idea.totalVotes) - 1);
    setLiked(!liked);
  };

  return (
    <div
      className="p-2 border rounded shadow-sm mb-2"
      onClick={() => navigate(`/idea/${idea.id}`)}
    >
      <span className="fs-4 fw-semibold">{idea.title}</span>
      <p className="project-description">{idea.description}</p>
      <div className="voting-buttons-container">
        <button
          className={`btn`}
          onClick={(e) => {
            e.stopPropagation();

            authState.isLogged
              ? handleLike(idea.id)
              : (noti("Debes iniciar sesion para votar", "info"),
                navigate("/iniciar-sesion"));
          }}
        >
          <div className=" d-flex">
            <span
              className={`material-symbols-outlined  fw-light
              ${liked ? `${styles.filledIcon} text-warning` : ""}
            }`}
            >
              star
            </span>
            <span className="fw-semibold">{idea.totalVotes}</span>
          </div>
        </button>
      </div>
    </div>
  );
};
