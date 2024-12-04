import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Carousel,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { authContext } from "../../../context/auth/Context";
import { getIdeas, createIdea, getIdeaById } from "../services/ideaServices";
import { BASE_URL } from "../../../constants/BASE_URL";
import "../../../styles/IdeaModal.css";

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
  const [showDialog, setShowDialog] = useState(false);

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
    setShowDialog(true);
  };

  const handleCloseDialog = () => setShowDialog(false);

  return (
    <Container className="my-5">
      <Row className="justify-content-center mb-4">
        <Col md={6} lg={5}>
          <Card className="shadow-lg">
            <Card.Body className="p-4">
              <span className="fw-semibold fs-3 ">Añadir un Proyecto</span>
              <Form
                onSubmit={handleAddIdea}
                className="border-0 shadow-none p-0"
              >
                <Form.Group controlId="formTitle" className="mb-3">
                  <Form.Label>Título</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Título del proyecto"
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
                    placeholder="Descripción del proyecto"
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
                    placeholder="¿Por qué es importante este proyecto?"
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
                  placeholder="Buscar proyectos por título"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form.Group>

              <div style={{ overflowY: "hidden" }}>
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
                        <Card.Text>Categoría: {idea.category}</Card.Text>
                        <Card.Text>
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
      <Dialog
        open={showDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle className="fw-bold fs-4 text-primary text-center mb-3">
          {selectedIdea?.title || "Título de la idea"}
        </DialogTitle>
        <DialogContent>
          <div className="creator-info mb-5">
            <h5 className="fw-bold text-dark">Creado por</h5>
            <div className="d-flex align-items-center mt-3 p-3 border rounded shadow-sm">
              <img
                className="me-3 rounded-circle"
                src={
                  selectedIdea?.profile?.profilePic
                    ? `${BASE_URL}/images/${selectedIdea.profile.profilePic}`
                    : "default-profile.png"
                }
                alt="Foto de perfil"
                height={50}
                width={50}
              />
              <div className="flex-grow-1">
                <h6 className="fw-bold fs-5 mb-1">
                  {selectedIdea?.profile?.names || "Nombre"}{" "}
                  {selectedIdea?.profile?.surnames || "Apellido"}
                </h6>
                <p className="text-secondary mb-1">
                  @{selectedIdea?.profile?.user?.username || "username"}
                </p>
              </div>
              <Link
                to={`/perfil/${selectedIdea?.profile?.user?.username || ""}`}
                className="btn btn-outline-info btn-sm"
              >
                Ver perfil
              </Link>
            </div>
          </div>

          <div className="idea-details">
            <h5 className="fw-bold text-dark mb-3">Detalles del Proyecto</h5>
            <div className="ps-3 border-start border-2">
              <p className="mb-3">
                <strong className="fw-bold">Descripción:</strong>{" "}
                <span style={{ color: "#212529" }}>
                  {selectedIdea?.description || "Sin descripción"}
                </span>
              </p>
              <p className="mb-3">
                <strong className="fw-bold">Categoría:</strong>{" "}
                <span style={{ color: "#212529" }}>
                  {selectedIdea?.category || "Sin categoría"}
                </span>
              </p>
              <p className="mb-3">
                <strong className="fw-bold">Objetivos:</strong>{" "}
                <span style={{ color: "#212529" }}>
                  {selectedIdea?.objectives || "Sin objetivos"}
                </span>
              </p>
              <p className="mb-3">
                <strong className="fw-bold">Justificación:</strong>{" "}
                <span style={{ color: "#212529" }}>
                  {selectedIdea?.justification || "Sin justificación"}
                </span>
              </p>
              <p className="mb-3">
                <strong className="fw-bold">Tecnologías:</strong>{" "}
                <span style={{ color: "#212529" }}>
                  {selectedIdea?.technologies || "Sin tecnologías"}
                </span>
              </p>
              <p className="mb-3">
                <strong className="fw-bold">Beneficiarios:</strong>{" "}
                <span style={{ color: "#212529" }}>
                  {selectedIdea?.beneficiaries || "Sin beneficiarios"}
                </span>
              </p>
            </div>
          </div>

          {selectedIdea?.attachments?.length > 0 && (
            <div className="attachments mt-5">
              <h5 className="fw-bold text-dark mb-3">Adjuntos</h5>
              <Carousel className="shadow-sm rounded">
                {selectedIdea.attachments.map((attachment, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={`${BASE_URL}/images/${attachment.url}`}
                      alt={`Adjunto ${index + 1}`}
                      height={400}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="secondary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
