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
        setIdeas(response.data);
      } catch (error) {
        console.error('Error fetching ideas:', error);
        enqueueSnackbar('Error fetching ideas', { variant: 'error' });
      }
    };

    fetchIdeas();
  }, []);

  const handleVote = async (ideaId, voteValue) => {
    try {
      const userId = authState?.user?.profile?.id;
      if (!userId) {
        throw new Error("User ID no encontrado");
      }
  
      const response = await axios.post('http://localhost:4000/vote', {
        userId: userId,
        ideaId: ideaId,
        vote: voteValue,
      });
  
      console.log('Response from server:', response.data);
  
      const updatedIdea = response.data;
      setIdeas((prevIdeas) =>
        prevIdeas.map((idea) =>
          idea.id === ideaId
            ? { ...idea, totalVotes: updatedIdea.totalVotes, userVote: updatedIdea.vote }
            : idea
        )
      );
  
      const message = typeof response.data.message === 'string' ? response.data.message : 'Voto registrado';
      enqueueSnackbar(message, { variant: 'success' });
    } catch (error) {
      console.error('Error handling vote:', error);
      const errorMessage = error.response?.data?.error || 'Error desconocido';
      enqueueSnackbar(`Error: ${errorMessage}`, { variant: 'error' });
    }
  };
  
  

  const handleIdeaClick = (ideaId) => {
    navigate(`/ranking/${ideaId}`); 
  };

  return (
    <div className="project-list">
      <h2>Lista de Ideas</h2>
      <ul>
        {ideas.map((idea) => (
          <li key={idea.id} className="project-item" onClick={() => handleIdeaClick(idea.id)}>
            <h3 className="project-title">{idea.title}</h3>
            <p className="project-description">{idea.description}</p>
            <div className="voting-ranking-section">
              <div className="votes-section">
                <p className="project-votes">Votos Totales: {idea.totalVotes || 0}</p>
                <div className="voting-buttons">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${star <= idea.userVote ? 'voted' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVote(idea.id, star);
                      }}
                    >
                      {star <= idea.userVote ? '★' : '☆'}
                    </span>
                  ))}
                  <button
                    className="vote-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVote(idea.id, 1);
                    }}
                  >
                    Me Gusta
                  </button>
                  {idea.userVote && (
                    <button
                      className="vote-button"
                      onClick={(e) => {
                        e.stopPropagation(); 
                        handleVote(idea.id, -1);
                      }}
                    >
                      Retirar Voto
                    </button>
                  )}
                </div>
              </div>
              <div className="ranking-section">
                <p className="ranking">Ranking</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
