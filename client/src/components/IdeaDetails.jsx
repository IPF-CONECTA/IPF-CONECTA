import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card, Spinner, Row, Col } from "react-bootstrap";
import '../../public/ideadetails.css';

export const IdeaDetails = () => {
  const { ideaId } = useParams();
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIdeaDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/idea/${ideaId}`);
        setIdea(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error al obtener los detalles de la idea");
        setLoading(false);
      }
    };

    fetchIdeaDetails();
  }, [ideaId]);

  if (loading) {
    return (
      <Container className="loading-container d-flex justify-content-center align-items-center">
        <Spinner animation="border" className="custom-spinner" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center">
        <p className="text-danger">{error}</p>
      </Container>
    );
  }

  return (
    <Container className="idea-details-container">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="idea-card shadow-lg p-4 rounded">
            <Card.Body>
              <Card.Title className="idea-title">{idea.title}</Card.Title>
              <Card.Text className="idea-description">Descripción: {idea.description}</Card.Text>
              <Card.Subtitle className="mb-3 text-muted">
                Categoría: <strong>{idea.category}</strong>
              </Card.Subtitle>
              <Card.Text className="idea-state">
                Estado: <span className="badge bg-info">{idea.state}</span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
