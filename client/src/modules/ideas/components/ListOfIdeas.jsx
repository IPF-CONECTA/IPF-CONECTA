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
  }, []);

  return (
    <div className="container p-4 bg-light shadow-sm rounded">
      <h2 className="text-center text-primary mb-4">Nuevas Ideas</h2>
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
