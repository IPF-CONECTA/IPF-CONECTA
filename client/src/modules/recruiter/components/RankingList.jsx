import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../public/ranking.css";
import { authService } from "../services/authService";
import { BASE_URL } from "../../../constants/BASE_URL";
const RankingList = () => {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/idea`, {
          headers: {
            Authorization: `Bearer ${authService.getToken()}`,
          },
        });

        const ideasWithVotes = response.data.map((idea) => ({
          ...idea,
          totalVotes: idea.votes.length,
        }));

        const sortedIdeas = ideasWithVotes.sort(
          (a, b) => b.totalVotes - a.totalVotes
        );
        setIdeas(sortedIdeas);
      } catch (error) {
        console.error("Error fetching ranking:", error);
      }
    };

    fetchRanking();
  }, []);

  return (
    <div className="ranking-container">
      <h2 className="ranking-title">Proyectos Destacados</h2>
      <ul className="ranking-list">
        {ideas.map((idea, index) => (
          <li key={idea.id} className="ranking-item">
            <div className="ranking-icon">{index + 1}</div>
            <div className="idea-info">
              <h3 className="idea-title">{idea.title}</h3>
              <p className="idea-votes">
                <i className="material-icons">thumb_up</i>
                Votos Totales: {idea.totalVotes}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankingList;
