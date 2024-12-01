import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import { useSnackbar } from "notistack";
import { authContext } from "../../../context/auth/Context";
import { getIdeas, createIdea, getIdeaById } from "../services/ideaServices";
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
    objectives: "",
    justification: "",
    technologies: "",
    complexity: "Media",
    beneficiaries: "",
    attachments: [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { authState } = useContext(authContext);
  const { token, user } = authState;
  const userId = user?.profile?.id;

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

    const {
      title,
      description,
      category,
      state,
      objectives,
      justification,
      technologies,
      complexity,
      beneficiaries,
      attachments,
    } = newIdea;

    console.log("New Idea:", newIdea);

    if (
      !title ||
      !description ||
      !category ||
      !state ||
      !objectives ||
      !justification ||
      !technologies ||
      !complexity ||
      !beneficiaries
    ) {
      enqueueSnackbar("Por favor, completa todos los campos.", {
        variant: "warning",
      });
      return;
    }

    try {
      const res = await createIdea(newIdea);

      if (res.status === 201) {
        enqueueSnackbar("Idea añadida exitosamente!", { variant: "success" });
        setNewIdea({
          title: "",
          description: "",
          category: "Tecnología",
          state: "Activo",
          objectives: "",
          justification: "",
          technologies: "",
          complexity: "Media",
          beneficiaries: "",
          attachments: [],
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

  const handleShowIdeaDetails = async (ideaId) => {
    const res = await getIdeaById(ideaId);
    if (res.status !== 200) {
      enqueueSnackbar("Error al obtener los detalles de la idea", {
        variant: "error",
      });
      return;
    }
    setSelectedIdea(res.data);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <Container className="my-5">
      <Row className="justify-content-center mb-4">
        <Col md={6} lg={5}>
          <Card className="shadow-lg">
            <Card.Body className="p-4">
              <span className="fw-semibold fs-3 ">Añadir Nueva Idea</span>
              <Form
                onSubmit={handleAddIdea}
                className="border-0 shadow-none p-0"
              >
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
                <Form.Group controlId="formObjectives" className="mb-3">
                  <Form.Label>Objetivos</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Objetivos principales"
                    value={newIdea.objectives}
                    onChange={(e) =>
                      setNewIdea({ ...newIdea, objectives: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formCategory" className="mb-3">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Control
                    as="select"
                    className="w-100"
                    value={newIdea.category}
                    onChange={(e) =>
                      setNewIdea({ ...newIdea, category: e.target.value })
                    }
                  >
                    <option>Tecnología</option>
                    <option>Educación</option>
                    <option>Salud</option>
                    <option>Medio Ambiente</option>
                    <option>Emprendimiento</option>
                    <option>Otros</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formJustification" className="mb-3">
                  <Form.Label>Justificación</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="¿Por qué es importante esta idea?"
                    value={newIdea.justification}
                    onChange={(e) =>
                      setNewIdea({ ...newIdea, justification: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formTechnologies" className="mb-3">
                  <Form.Label>Tecnologías</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Tecnologías a utilizar"
                    value={newIdea.technologies}
                    onChange={(e) =>
                      setNewIdea({ ...newIdea, technologies: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formComplexity" className="mb-3">
                  <Form.Label>Nivel de Complejidad</Form.Label>
                  <Form.Control
                    as="select"
                    className="w-100"
                    value={newIdea.complexity}
                    onChange={(e) =>
                      setNewIdea({ ...newIdea, complexity: e.target.value })
                    }
                  >
                    <option>Baja</option>
                    <option>Media</option>
                    <option>Alta</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formBeneficiaries" className="mb-3">
                  <Form.Label>Beneficiarios</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="¿Quiénes se benefician?"
                    value={newIdea.beneficiaries}
                    onChange={(e) =>
                      setNewIdea({ ...newIdea, beneficiaries: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formAttachments" className="mb-3">
                  <Form.Label>Archivos Adjuntos</Form.Label>
                  <Form.Control
                    type="file"
                    multiple
                    name="attachments"
                    onChange={(e) =>
                      setNewIdea({
                        ...newIdea,
                        attachments: Array.from(e.target.files),
                      })
                    }
                  />
                </Form.Group>

                <div className="d-flex justify-content-end">
                  <Button variant="primary" type="submit" className="mt-3">
                    Añadir Idea
                  </Button>
                </div>
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
                        <Card.Text>
                          Creación: {idea.creationDate}
                          <br />
                          Complejidad: {idea.complexity}
                          <br />
                          Beneficiarios: {idea.beneficiaries}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  ))
                ) : (
                  <p className="text-center text-muted">
                    No hay ideas disponibles.
                  </p>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedIdea?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Descripción:</strong> {selectedIdea?.description}
          </p>
          <p>
            <strong>Categoría:</strong> {selectedIdea?.category}
          </p>
          <p>
            <strong>Objetivos:</strong> {selectedIdea?.objectives}
          </p>
          <p>
            <strong>Justificación:</strong> {selectedIdea?.justification}
          </p>
          <p>
            <strong>Tecnologías:</strong> {selectedIdea?.technologies}
          </p>
          <p>
            <strong>Beneficiarios:</strong> {selectedIdea?.beneficiaries}
          </p>
          {selectedIdea?.attachments.map((attachment) => (
            <img src={`${BASE_URL}/images/${attachment.url}`} alt="" />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
