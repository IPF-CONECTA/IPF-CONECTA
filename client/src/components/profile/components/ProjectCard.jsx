import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project, username }) => {
  return (
    <div className="col-md-4">
      <div className="card">
        <div className="card-header">
          <span className="card-title fs-6 fw-semibold">{project.name}</span>
        </div>
        <div className="w-100 d-flex justify-content-center">
          <img
            height={70}
            src={project.projectLogo}
            alt={"logo del proyecto"}
          />
        </div>
        <div className="card-body">
          <p className="card-text">{project.smallDescription}</p>
        </div>
        <div className="d-flex justify-content-between align-items-center p-2">
          <div className="border rounded-4 bg-body-secondary px-2">
            <span className="fw-semibold">{project.status}</span>
          </div>

          <button className="btn btn-light border rounded px-2 py-0">
            <Link
              to={`/${username}/proyectos/${project.id}`}
              className="text-decoration-none text-secondary fw-semibold"
            >
              Ver
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
