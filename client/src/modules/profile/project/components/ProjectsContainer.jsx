import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ProjectForm } from "./ProjectForm";
import { ProjectCard } from "./ProjectCard";

export const ProjectsContainer = ({
  own,
  projectsData,
  onProjectSubmit,
  username,
}) => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [openProjectModal, setOpenProjectModal] = useState(false);

  useEffect(() => {
    const projects = projectsData.slice(0, 3);
    setProjects(projects);
  }, [projectsData]);

  return (
    <div className="w-100 border-bottom" id="proyectos">
      <div className="p-4">
        <div className="d-flex justify-content-between mb-2">
          <span className="fw-bold fs-5">Proyectos</span>
          {own && (
            <div className="d-flex">
              <button
                type="button"
                onClick={() => setOpenProjectModal(true)}
                className="btn w-100 d-flex p-0 align-items-center me-3 "
              >
                <span className="material-symbols-outlined text-dark-emphasis">
                  add
                </span>
              </button>
              <button
                className="btn d-flex p-0 align-items-center"
                onClick={() => navigate("proyecto")}
              >
                <span className="material-symbols-outlined text-dark-emphasis">
                  edit
                </span>
              </button>
              <ProjectForm
                onProjectSubmit={onProjectSubmit}
                openProjectModal={openProjectModal}
                setOpenProjectModal={setOpenProjectModal}
                username={username}
              />
            </div>
          )}
        </div>
        <div>
          <ul className="list-group list-group-flush">
            {projects.length >= 1 ? (
              projects.map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  username={username}
                  onProjectSubmit={onProjectSubmit}
                  own={own}
                />
              ))
            ) : (
              <div className="text-center">
                <p className="text-muted">No hay proyectos</p>
              </div>
            )}
          </ul>
        </div>
      </div>
      {projectsData.length > 3 && (
        <>
          <hr className="text-body-tertiary m-0" />

          <div className="d-flex justify-content-center p-2">
            <Link
              to={"proyectos"}
              className="fw-semibold p-0 text-body-tertiary text-decoration-none"
            >
              ver todos los proyectos ({projectsData.length})
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
