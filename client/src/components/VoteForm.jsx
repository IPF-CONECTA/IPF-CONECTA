import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { authContext } from '../context/auth/Context';
import { useNavigate } from 'react-router-dom';
import '../../public/vote.css'; 

const ProjectList = () => {
  const { authState } = useContext(authContext); 
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate(); 
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await axios.get('http://localhost:4000/idea');
        setIdeas(response.data.map(idea => ({
          ...idea,
          totalVotes: idea.totalVotes || 0, 
          userVote: idea.userVote || 0,
        })));
      } catch (error) {
        enqueueSnackbar('Error al obtener ideas', { variant: 'error' });
      }
    };

    fetchIdeas();
  }, []);

  const handleVote = async (ideaId) => {
    try {
      const userId = authState?.user?.profile?.id;
      if (!userId) throw new Error("User ID no encontrado");

      // Verifica si el usuario ya votó
      const idea = ideas.find(idea => idea.id === ideaId);
      if (idea.userVote > 0) {
        enqueueSnackbar('Ya has votado por esta idea. Retira tu voto si deseas volver a votar.', { variant: 'warning' });
        return;
      }

      const response = await axios.post('http://localhost:4000/vote', {
        userId: userId,
        ideaId: ideaId,
        vote: 1, 
      });

      const updatedIdea = response.data;
      setIdeas(prevIdeas =>
        prevIdeas.map(idea =>
          idea.id === ideaId
            ? { ...idea, totalVotes: updatedIdea.totalVotes, userVote: 1 }
            : idea
        ).sort((a, b) => b.totalVotes - a.totalVotes)
      );

      enqueueSnackbar('Voto registrado', { variant: 'success' });
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Error desconocido';
      enqueueSnackbar(`Error: ${errorMessage}`, { variant: 'error' });
    }
  };

  const handleRemoveVote = async (ideaId) => {
    try {
      const userId = authState?.user?.profile?.id;
      if (!userId) throw new Error("User ID no encontrado");

      const response = await axios.delete('http://localhost:4000/vote', {
        data: {
          userId: userId,
          ideaId: ideaId,
        },
      });

      const updatedIdea = response.data;
      setIdeas(prevIdeas =>
        prevIdeas.map(idea =>
          idea.id === ideaId
            ? { ...idea, totalVotes: updatedIdea.totalVotes, userVote: 0 }
            : idea
        ).sort((a, b) => b.totalVotes - a.totalVotes)
      );

      enqueueSnackbar('Voto retirado', { variant: 'info' });
    } catch (error) {
      enqueueSnackbar('Error al retirar el voto', { variant: 'error' });
    }
  };

  return (
    <div className="project-list">
      <h2 className="section-title">Ideas Innovadoras</h2>
      <div className="project-grid">
        {ideas.map((idea) => (
          <div key={idea.id} className="project-card" onClick={() => handleIdeaClick(idea.id)}>
            <h3 className="project-title">{idea.title}</h3>
            <p className="project-description">{idea.description}</p>
            <div className="voting-ranking-section">
              <div className="votes-section">
                <p className="project-votes">Votos Totales: {idea.totalVotes || 0}</p>
                <div className="voting-buttons">
                  <button
                    className={`vote-button ${idea.userVote > 0 ? 'disabled' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVote(idea.id);
                    }}
                    disabled={idea.userVote > 0}
                  >
                    Votar
                  </button>
                  {idea.userVote > 0 && (
                    <button
                      className="remove-vote-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveVote(idea.id);
                      }}
                    >
                      Retirar Voto
                    </button>
                  )}
                </div>
              </div>
              <div className="ranking-section">
                <p className="ranking">Ranking: {idea.ranking}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
