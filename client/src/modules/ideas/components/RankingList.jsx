import React, { useContext, useEffect, useState } from "react";
import { IdeaCard } from "./IdeaCard";
import { authContext } from "../../../context/auth/Context";
import {
  getRankingIdeas,
  getRankingIdeasLogged,
} from "../services/ideaServices";
import { useNoti } from "../../../hooks/useNoti";
import styles from "../../../../public/css/ranking.module.css";
export const RankingList = () => {
  const [ideas, setIdeas] = useState([]);
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

  return (
    <div className="container rounded w-50">
      <div className="row row-cols-1  g-4">
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
              <IdeaCard idea={idea} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
