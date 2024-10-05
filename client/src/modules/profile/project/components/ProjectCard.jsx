import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../../../public/css/project.module.css";
import { projectsService } from "../services/projectsServices";
import { useNoti } from "../../../../hooks/useNoti";
import { Dialog } from "@mui/material";
import DOMPurify from "dompurify";
import { getDate } from "../../../../helpers/getTime";

const ProjectCard = ({ project }) => {
  console.log(project);
  const noti = useNoti();
  const [showProjectModal, setShowProject] = useState(false);
  const [projectData, setProjectData] = useState(null);
  const showProject = async (id) => {
    const res = await projectsService.getProject(id);
    if (res.status !== 200) {
      return noti("Hubo un error al obtener el proyecto", "error");
    }
    setShowProject(true);
    setProjectData(res.data);
    console.log(res.data);
  };
  return (
    <div className="col-md-4">
      <div className={`card ${styles.projectCard}`}>
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
          <p className="card-text text-secondary">{project.smallDescription}</p>
        </div>
        <div className="d-flex justify-content-between align-items-center p-2">
          <div className="d-flex">
            <div className={`fw-semibold text-secondary ${styles.smallText}`}>
              <span>{getDate(project.startDate)}</span>
              {project.endDate ? (
                <span className="ms-2">- {getDate(project.endDate)}</span>
              ) : (
                <span className="ms-2"> - Actualidad</span>
              )}
            </div>
            {project.private && (
              <div className="ms-2 rounded-circle p-1 bg-body-secondary d-flex align-items-center">
                <span className="material-symbols-outlined text-secondary fs-5">
                  lock
                </span>
              </div>
            )}
          </div>

          <div className="d-flex gap-2">
            {project.projectLink && (
              <Link
                target="_blank"
                title="Ir al proyecto"
                rel="noopener noreferrer"
                to={project.projectLink}
                className="text-decoration-none text-secondary  bg-body-secondary d-flex align-items-center p-1  rounded-circle"
              >
                <span className="material-symbols-outlined fs-5">link</span>
              </Link>
            )}
            <button
              onClick={() => showProject(project.id)}
              title="Ver proyecto"
              className="btn text-decoration-none text-secondary  bg-body-secondary d-flex align-items-center p-1  rounded-circle"
            >
              <span className="material-symbols-outlined fs-5">visibility</span>
            </button>
            <Dialog
              open={showProjectModal}
              onClose={() => setShowProject(false)}
              fullWidth
              maxWidth="sm"
            >
              <div className="p-3">
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center w-100 me-2">
                    <img
                      height={70}
                      src={projectData?.projectLogo}
                      alt={"logo del proyecto"}
                    />
                    <div className="d-flex w-100 justify-content-between h-100">
                      <div className="d-flex flex-column">
                        <span className="fs-4 fw-semibold">
                          {projectData?.name}
                        </span>
                        <span className="text-secondary">
                          {projectData?.smallDescription}
                        </span>
                      </div>
                      <div className="d-flex align-items-start">
                        <div>
                          {
                            <div className="border rounded-4 bg-body-secondary px-2">
                              <span className="fw-semibold text-secondary">
                                {projectData?.status}
                              </span>
                            </div>
                          }
                        </div>
                        {projectData?.private == true ? (
                          <div className="ms-2 rounded-circle p-1 bg-body-secondary d-flex align-items-center">
                            <span className="material-symbols-outlined text-secondary fs-5">
                              lock
                            </span>
                          </div>
                        ) : (
                          <div className="ms-2 rounded-circle p-1 bg-body-secondary d-flex align-items-center">
                            <span className="material-symbols-outlined text-secondary fs-5">
                              lock_open_right
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        setShowProject(false);
                        setProjectData(null);
                      }}
                      className="btn rounded-circle p-1 bg-body-secondary d-flex align-items-center border-0"
                    >
                      <span className="material-symbols-outlined fs-5 text-secondary ">
                        close
                      </span>
                    </button>
                  </div>
                </div>
                <div className="d-flex justify-content-center"></div>
                <div className="d-flex flex-column">
                  {projectData?.description && (
                    <>
                      <span className="fw-semibold fs-5 text-secondary ">
                        Descripción del proyecto
                      </span>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(projectData?.description),
                        }}
                      ></div>
                    </>
                  )}
                </div>
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
