import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card, Spinner, Row, Col } from "react-bootstrap";
import { authService } from "../../../modules/auth/services/authService";
import { BASE_URL } from "../../../constants/BASE_URL";
export const IdeaDetails = () => {
  const { ideaId } = useParams();
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIdeaDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/idea/${ideaId}`, {
          headers: {
            Authorization: `Bearer ${authService.getToken()}`,
          },
        });
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
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <p className="text-danger fs-4">{error}</p>
      </Container>
    );
  }

  return (
    <Container className="py-5 idea-details-container">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg p-4 rounded border-0">
            <Card.Body>
              <Card.Title className="idea-title text-primary fs-2 fw-bold">
                {idea.title}
              </Card.Title>
              <hr />
              <Card.Text className="idea-description mb-4 fs-5">
                {idea.description}
              </Card.Text>
              <Card.Subtitle className="mb-3 text-muted fs-6">
                <strong>Categoría:</strong> {idea.category}
              </Card.Subtitle>
              <Card.Text className="idea-state mb-2">
                <strong>Fecha de Creación: </strong>
                {idea.updatedAt}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
