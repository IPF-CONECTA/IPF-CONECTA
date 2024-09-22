import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RankingList = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await axios.get('http://localhost:4000/ranking');
        setIdeas(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching ranking:', error);
        setLoading(false);
      }
    };

    fetchRanking();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Ranking de Proyectos</h2>
      <ul>
        {ideas.map((idea) => (
          <li key={idea.id}>
            <h3>{idea.title}</h3>
            <p>Votos Totales: {idea.totalVotes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankingList;
