import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ProjectCard from "./ProjectCard";
import { CreateProjectForm } from "./CreateProjectForm";

export const Projects = ({ username, projectsData, own, onProjectSubmit }) => {
  const [openProjectModal, setOpenProjectModal] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(projectsData);
  }, [projectsData]);

  return (
    <>
      <div
        className="w-100 d-flex flex-column justify-content-between p-4 border-bottom"
        id="proyectos"
      >
        <div className="d-flex justify-content-between w-100 mb-2">
          <span className="fs-5 fw-bold">Proyectos</span>
          {own && (
            <div className="d-flex">
              <button
                onClick={() => setOpenProjectModal(true)}
                className="btn d-flex p-0 align-items-center me-3 "
              >
                <span className="material-symbols-outlined text-dark-emphasis">
                  add
                </span>
              </button>
              <button className="btn d-flex p-0 align-items-center">
                <span className="material-symbols-outlined text-dark-emphasis">
                  edit
                </span>
              </button>
            </div>
          )}
        </div>
        <CreateProjectForm
          openProjectModal={openProjectModal}
          setOpenProjectModal={setOpenProjectModal}
          onProjectSubmit={onProjectSubmit}
        />
        <div>
          <div className="row ms-2">
            {projects && projects.length >= 1 ? (
              projects.slice(0, 3).map((project, index) => {
                return (
                  <React.Fragment key={project.id}>
                    <ProjectCard project={project} username={username} />
                    {index !== projects.length - 1 && (
                      <hr className="my-3 text-secondary" />
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <span className="text-secondary">No tienes proyectos</span>
            )}
          </div>
          {projectsData && projectsData.length > 3 && (
            <div className="w-100 d-flex justify-content-end">
              <Link
                to={`/perfil/${username}/proyectos`}
                className="text-decoration-none"
              >
                <button className="btn btn-outline-dark">
                  Ver todos los proyectos
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
