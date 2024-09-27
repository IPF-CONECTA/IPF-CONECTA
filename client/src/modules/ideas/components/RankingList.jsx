import React, { useContext, useEffect, useState } from "react";
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
      const res = authState.isLogged
        ? await getRankingIdeasLogged()
        : await getRankingIdeas();
      if (res.status !== 200) return noti(res.error || "Hubo un error", "error");
      setIdeas(res.data);
    };
    fetchRanking();
  }, [authState]);

  return (
    <div className="container my-5 p-4 bg-light shadow-sm rounded">
      <h2 className="text-center text-success mb-4">Proyectos con más Favoritos</h2>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {ideas.map((idea) => (
          <div className="col" key={idea.id}>
            <IdeaCard idea={idea} />
          </div>
        ))}
      </div>
    </div>
  );
};
