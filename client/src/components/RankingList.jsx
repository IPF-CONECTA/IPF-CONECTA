import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../public/ranking.css'; 

const RankingList = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await axios.get("http://localhost:4000/idea");
        setIdeas(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ranking:", error);
        setLoading(false);
      }
    };

    fetchRanking();
  }, []);

  if (loading) {
    return <p className="loading">Cargando...</p>;
  }

  return (
    <div className="ranking-container">
      <h2 className="ranking-title">Ranking de Proyectos</h2>
      <ul className="ranking-list">
        {ideas.map((idea) => (
          <li key={idea.id} className="ranking-item">
            <h3 className="idea-title">{idea.title}</h3>
            <p className="idea-votes">Votos Totales: {idea.totalVotes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankingList;
