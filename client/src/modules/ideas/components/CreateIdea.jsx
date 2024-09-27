import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../../context/auth/Context";
import { getIdeas, createIdea } from "../services/ideaServices";

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

  const loadIdeas = async () => {
    try {
      const res = await getIdeas();
      if (res.status === 200) {
        setIdeas(res.data);
        setFilteredIdeas(res.data);
      } else {
        throw new Error("Error al obtener las ideas");
      }
    } catch (error) {
      setError(error.message);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  useEffect(() => {
    loadIdeas();
  }, [token]);

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
      const res = await createIdea({ ...newIdea, profileId: userId });
      if (res.status === 201) {
        enqueueSnackbar("Idea añadida exitosamente!", { variant: "success" });
        setNewIdea({
          title: "",
          description: "",
          category: "Tecnología",
          state: "Activo",
        });
        await loadIdeas();
      } else {
        throw new Error("Error al crear la idea.");
      }
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
    <Container className="my-5">
      <Row className="justify-content-center mb-4">
        <Col md={6} lg={5}>
          <Card className="shadow-lg">
            <Card.Body>
              <h3 className="text-center mb-4">Añadir Nueva Idea</h3>
              <Form onSubmit={handleAddIdea}>
                <Form.Group controlId="formTitle" className="mb-3">
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
                <Form.Group controlId="formDescription" className="mb-3">
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
                <Form.Group controlId="formCategory" className="mb-3">
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
                <Form.Group controlId="formState" className="mb-3">
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
                  <Button variant="primary" type="submit" className="mt-3">
                    Añadir Idea
                  </Button>
                </center>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={5}>
          <Card className="shadow-lg">
            <Card.Body>
              <h3 className="text-center mb-4">Ideas de Proyectos</h3>
              <Form.Group controlId="formSearch" className="mb-4">
                <Form.Control
                  type="text"
                  placeholder="Buscar ideas por título"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form.Group>
              <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                {filteredIdeas.length > 0 ? (
                  filteredIdeas.map((idea) => (
                    <Card
                      key={idea.id}
                      onClick={() => handleShowIdeaDetails(idea.id)}
                      className="mb-3 clickable-card"
                    >
                      <Card.Body>
                        <Card.Title>{idea.title}</Card.Title>
                        <Card.Text>{idea.description}</Card.Text>
                        <Card.Subtitle className="mb-2 text-muted">
                          Categoría: {idea.category}
                        </Card.Subtitle>
                      </Card.Body>
                    </Card>
                  ))
                ) : (
                  <p className="text-center text-muted">No hay ideas disponibles.</p>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
