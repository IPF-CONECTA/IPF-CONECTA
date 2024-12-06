import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ProjectCard from "./ProjectCard";
import { ProjectForm } from "./ProjectForm";

export const AllProjectsContainer = ({
  own,
  projectsData,
  onProjectSubmit,
  username,
}) => {
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
              <ProjectForm
                openProjectModal={openProjectModal}
                setOpenProjectModal={setOpenProjectModal}
                onProjectSubmit={onProjectSubmit}
              />
            </div>
          )}
        </div>

        <ul className="list-group-flush w-100">
          {projects?.length >= 1
            ? projects.map((education, index) => (
                <React.Fragment key={education.id}>
                  <ProjectCard
                    project={education}
                    onProjectSubmit={onProjectSubmit}
                    own={own}
                    username={username}
                    edit={true}
                  />
                  {index !== projects.length - 1 && (
                    <hr className="text-bg-body-tertiary" />
                  )}
                </React.Fragment>
              ))
            : own && (
                <li className="list-group-item text-secondary">
                  Agrega tu proyectos personales
                </li>
              )}
        </ul>
      </div>
    </>
  );
};
