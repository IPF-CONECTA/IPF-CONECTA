import React, { useContext, useEffect, useState } from "react";
import styles from "../../../../public/css/ranking.module.css";
import { IdeaCard } from "./IdeaCard";
import { authContext } from "../../../context/auth/Context";
import {
  getRankingIdeas,
  getRankingIdeasLogged,
} from "../services/ideaServices";
import { useNoti } from "../../../hooks/useNoti";

export const RankingList = () => {
  const [ideas, setIdeas] = useState([]);
  const { authState } = useContext(authContext);
  const noti = useNoti();
  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const res = authState.isLogged
          ? await getRankingIdeasLogged()
          : await getRankingIdeas();

        if (res.status !== 200) {
          return noti(res.error || "hubo un error", "error");
        }

        setIdeas(res.data);
      } catch (error) {
        console.error("Error fetching ranking:", error);
      }
    };

    fetchRanking();
  }, [authState]);

  return (
    <div className={`${styles.rankingContainer} shadow-sm`}>
      <span className="text-center fs-3 fw-semibold text-dark mb-2">
        Proyectos con más favoritos
      </span>
      <ul className="p-0">
        {ideas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </ul>
    </div>
  );
};
