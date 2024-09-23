import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { projectsService } from "../services/projectsServices";
import { useNoti } from "../hooks/useNoti";

export const CreateProjectForm = () => {
  const noti = useNoti();
  const navigate = useNavigate();

  const [project, setProject] = useState({
    name: "",
    status: "Comenzando",
    privacity: "publico",
    description: "",
    projectLink: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleSwitchChange = () => {
    setProject((prevProject) => ({
      ...prevProject,
      privacity: prevProject.privacity === "publico" ? "privado" : "publico",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProject = await projectsService.createProject(project);
      {
        console.log({ newProject });
      }
      if (newProject.status != 201) {
        noti("Ha ocurrido algo", "danger");
      }
      navigate("/");
      noti("Proyecto creado con exito", "success");
    } catch (error) {
      console.log(error.response.data);
      noti("Error al crear el proyecto", "danger");
    }
  };

  return (
    <div className="d-flex flex-row">
      <form className="form-group m-5" onSubmit={handleSubmit}>
        <h3 className="text-center">
          Crea un nuevo proyecto para que las demas personas sepan en que has
          estado trabajando!
        </h3>
        <label className="mb-0">
          Nombre del proyecto <span className="text-danger">*</span>
        </label>
        <input
          name="name"
          type="text"
          onChange={handleChange}
          value={project.name}
          className="input mb-3"
          placeholder="Ej: QR-Generator.."
        />
        <label className="mb-0">
          Descripción <span className="text-danger">*</span>
        </label>{" "}
        <input
          name="description"
          type="text"
          onChange={handleChange}
          value={project.description}
          className="form-control mb-3"
          placeholder="Ej: Generador de QR automaticos utilizando python y librerias como... "
        />
        <label className="mb-0">
          Estado del proyecto <span className="text-danger">*</span>
        </label>
        <select
          name="status"
          onChange={handleChange}
          value={project.status}
          className="form-select mb-3"
        >
          <option value="Comenzando">Comenzando</option>
          <option value="Pendiente">Pendiente</option>
          <option value="En progreso">En progreso</option>
          <option value="Finalizado">Finalizado</option>
        </select>
        <label className="mb-0">
          Link/directorio de tu proyecto <span className="text-danger">*</span>
        </label>{" "}
        <input
          name="projectLink"
          type="text"
          onChange={handleChange}
          value={project.projectLink}
          className=""
          placeholder="Ej: https://github.com/tu-usuario/tu-repositorio"
        />
        <label>Logo de tu proyecto</label>
        <input
          type="file"
          value={project.projectLogo}
          onChange={handleChange}
          name="projectLogo"
        />
        <label htmlFor="">Privacidad</label>
        <div className="form-check form-switch">
          <input
            name="privacity"
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckPublicPrivate"
            checked={project.privacity === "publico"}
            onChange={handleSwitchChange}
            value={project.privacity}
          />
          <label
            className="form-check-label"
            htmlFor="flexSwitchCheckPublicPrivate"
          >
            {project.privacity.charAt(0).toUpperCase() +
              project.privacity.slice(1)}
          </label>{" "}
        </div>
        <button type="submit" className="btn btn-outline-dark w-100 mb-2 mt-2">
          {" "}
          Agregar
        </button>
        <p className="fw-lighter">
          NOTA: * significa que el camspo es obligatorio
        </p>
      </form>
      <div>
        <img src="./img/agregar-proyecto.png" width={650} />
      </div>
    </div>
  );
};
