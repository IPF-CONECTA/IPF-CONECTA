import React, { useEffect, useState, useContext } from "react";
import { useNoti } from "../../../hooks/useNoti";
import { getIdeas, getIdeasLogged } from "../services/ideaServices";
import { IdeaCard } from "./IdeaCard";
import { authContext } from "../../../context/auth/Context";

export const ListOfIdeas = () => {
  const noti = useNoti();
  const [ideas, setIdeas] = useState([]);
  const { authState } = useContext(authContext);

  const fetchIdeas = async () => {
    const res = authState.isLogged ? await getIdeasLogged() : await getIdeas();
    if (res.status !== 200) {
      return noti(res.error, "error");
    }
    setIdeas(res.data);
  };

  useEffect(() => {
    fetchIdeas();
  }, [authState]);

  return (
    <div className="project-list">
      <h2 className="section-title">Nuevas ideas</h2>
      <div className="project-grid">
        {ideas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </div>
    </div>
  );
};
