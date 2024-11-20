import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import styles from "../../public/ideaprojects.module.css";
import { authContext } from "../context/auth/Context";
import { authService } from "../services/authService";
import { BASE_URL } from "../../../constants/BASE_URL";
export const IdeaProjects = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [ideas, setIdeas] = useState([]);
  const [filteredIdeas, setFilteredIdeas] = useState([]);
  const [newIdea, setNewIdea] = useState({
    title: "",
    description: "",
    category: "Tecnología",
    state: "Activo",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  const { authState } = useContext(authContext);
  const { token, user } = authState;

  const userId = user?.profile?.id;
  const navigate = useNavigate();

  const fetchIdeas = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/idea`, {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Error al obtener las ideas");
    }
  };

  const createIdea = async (idea) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/idea`,
        { ...idea, profileId: userId },
        {
          headers: {
            Authorization: `Bearer ${authService.getToken()}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Error al crear la idea: " + error.message);
    }
  };

  useEffect(() => {
    const loadIdeas = async () => {
      try {
        if (!token) throw new Error("Token is missing. Please log in again.");
        const data = await fetchIdeas(token);
        setIdeas(data);
        setFilteredIdeas(data);
      } catch (error) {
        setError(error.message);
        enqueueSnackbar(error.message, { variant: "error" });
      }
    };
    loadIdeas();
  }, [token, enqueueSnackbar]);

  useEffect(() => {
    const filtered = ideas.filter((idea) =>
      idea.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredIdeas(filtered);
  }, [searchTerm, ideas]);

  const handleAddIdea = async (e) => {
    e.preventDefault();
    if (!userId) {
      enqueueSnackbar("User ID is missing. Please log in again.", {
        variant: "error",
      });
      return;
    }

    if (
      !newIdea.title ||
      !newIdea.description ||
      !newIdea.category ||
      !newIdea.state
    ) {
      enqueueSnackbar("Por favor, completa todos los campos.", {
        variant: "warning",
      });
      return;
    }
    try {
      await createIdea(newIdea);
      enqueueSnackbar("Idea añadida exitosamente!", { variant: "success" });
      setNewIdea({
        title: "",
        description: "",
        category: "Tecnología",
        state: "Activo",
      });
      const data = await fetchIdeas(token);
      setIdeas(data);
      setFilteredIdeas(data);
    } catch (error) {
      enqueueSnackbar(`Error al crear la idea: ${error.message}`, {
        variant: "error",
      });
    }
  };

  const handleShowIdeaDetails = (ideaId) => {
    navigate(`/idea/${ideaId}`);
  };

  return (
    <Container fluid className={styles.container}>
      <Row className="justify-content-center mb-4">
        <Col md={6} lg={6} className={styles.section}>
          <Card className={styles.card}>
            <Card.Body>
              <center>
                <h2>Añadir Nueva Idea</h2>
              </center>
              <Form onSubmit={handleAddIdea}>
                <Form.Group controlId="formTitle" className={styles.formGroup}>
                  <Form.Label>Título</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Título de la idea"
                    value={newIdea.title}
                    onChange={(e) =>
                      setNewIdea({ ...newIdea, title: e.target.value })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group
                  controlId="formDescription"
                  className={styles.formGroup}
                >
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Descripción de la idea"
                    value={newIdea.description}
                    onChange={(e) =>
                      setNewIdea({ ...newIdea, description: e.target.value })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group
                  controlId="formCategory"
                  className={styles.formGroup}
                >
                  <Form.Label>Categoría</Form.Label>
                  <Form.Control
                    as="select"
                    value={newIdea.category}
                    onChange={(e) =>
                      setNewIdea({ ...newIdea, category: e.target.value })
                    }
                    required
                  >
                    <option>Tecnología</option>
                    <option>Salud</option>
                    <option>Educación</option>
                    <option>Negocios</option>
                    <option>Medio Ambiente</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formState" className={styles.formGroup}>
                  <Form.Label>Estado</Form.Label>
                  <Form.Control
                    as="select"
                    value={newIdea.state}
                    onChange={(e) =>
                      setNewIdea({ ...newIdea, state: e.target.value })
                    }
                    required
                  >
                    <option>Activo</option>
                    <option>Finalizado</option>
                  </Form.Control>
                </Form.Group>
                <center>
                  <Button
                    variant="primary"
                    type="submit"
                    className={styles.submitButton}
                  >
                    Añadir Idea
                  </Button>
                </center>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={6} className={styles.section}>
          <Card className={styles.card}>
            <Card.Body>
              <center>
                <h2>Ideas de Proyectos</h2>
              </center>
              <Form.Group controlId="formSearch" className={styles.formGroup}>
                <Form.Control
                  type="text"
                  placeholder="Buscar ideas por título"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form.Group>
              <div className={styles.scrollContainer}>
                {filteredIdeas.length > 0 ? (
                  filteredIdeas.map((idea) => (
                    <Card
                      key={idea.id}
                      className={styles.ideaCard}
                      onClick={() => handleShowIdeaDetails(idea.id)}
                    >
                      <Card.Body>
                        <Card.Title>{idea.title}</Card.Title>
                        <Card.Text>Descripción: {idea.description}</Card.Text>
                        <Card.Subtitle className="mb-2 text-muted">
                          Categoría: {idea.category}
                        </Card.Subtitle>
                      </Card.Body>
                    </Card>
                  ))
                ) : (
                  <p className="text-center">No hay ideas disponibles.</p>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
