import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../../../public/css/project.module.css";
import { projectsService } from "../services/projectsServices";
import { useNoti } from "../../../../hooks/useNoti";
import { Dialog } from "@mui/material";
import DOMPurify from "dompurify";
import { getDateMonth } from "../../../../helpers/getTime";
import { SkillsList } from "../../components/SkillsList";
import { BASE_URL } from "../../../../constants/BASE_URL";

const ProjectCard = ({ project }) => {
  const noti = useNoti();
  const [openImage, setOpenImage] = useState([false, 0]);
  const [showProjectModal, setShowProject] = useState(false);
  const [projectData, setProjectData] = useState(null);
  const [description, setDescription] = useState(
    project.description?.replace(/\n/g, "<br />")
  );
  const [attachments, setAttachments] = useState(project.attachments || []);

  const handleImageClick = (index) => {
    setOpenImage([true, index]);
  };
  const [showDescription, setShowDescription] = useState(false);
  const showProject = async (id) => {
    const res = await projectsService.getProject(id);
    console.log(res.data);
    if (res.status !== 200) {
      return noti("Hubo un error al obtener el proyecto", "error");
    }

    setShowProject(true);
    setProjectData(res.data);
  };
  return (
    <div>
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <div>
              <span className=" fs-6 fw-semibold">{project.name}</span>
              <div className={`text-secondary ${styles.smallText}`}>
                <span>{getDateMonth(project.startDate)}</span>
                {project.endDate ? (
                  <span> - {getDateMonth(project.endDate)}</span>
                ) : (
                  <span> - Actualidad</span>
                )}
              </div>
            </div>
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
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <div className={`${styles.smallText} py-2`}>
              {description.length > 150 &&
                (showDescription ? (
                  <div
                    className={`${styles.smallText} HOLA`}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(description),
                    }}
                  ></div>
                ) : (
                  <div className="d-flex">
                    <div
                      className={`HOLA2 ${styles.smallText}`}
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(description.slice(0, 100)),
                      }}
                    ></div>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowDescription(true)}
                      className="text-secondary"
                    >
                      ...Ver más
                    </span>
                  </div>
                ))}
            </div>

            <SkillsList
              skillsData={project?.skills}
              name={project.name}
              type="Proyecto"
            />
            {attachments.length > 0 && (
              <div className="d-flex gap-2 mt-2">
                {attachments.map((attachment, index) => (
                  <img
                    onClick={() => {
                      handleImageClick(index);
                    }}
                    style={{ cursor: "pointer" }}
                    crossOrigin="anonymous"
                    className="border rounded p-1"
                    height={70}
                    src={`${BASE_URL}/images/${attachment.url}`}
                    key={attachment.id}
                  />
                ))}
                {openImage[0] && (
                  <Dialog
                    open={openImage[0]}
                    onClose={() => setOpenImage([false, 0])}
                    fullWidth
                    maxWidth="lg"
                  >
                    <div id="attachmentsGallery" className="carousel slide">
                      <div className="carousel-inner">
                        {attachments.map((attachment, index) => (
                          <div
                            className={`carousel-item ${
                              index === openImage[1] ? "active" : ""
                            }`}
                            key={attachment.id}
                          >
                            <img
                              crossOrigin="anonymous"
                              src={`${BASE_URL}/images/${attachment.url}`}
                              className="d-block w-100"
                              alt="imagen"
                            />
                          </div>
                        ))}
                      </div>
                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#attachmentsGallery"
                        data-bs-slide="prev"
                      >
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#attachmentsGallery"
                        data-bs-slide="next"
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </div>
                  </Dialog>
                )}
              </div>
            )}
            <div></div>
          </div>

          <div className="d-flex">
            {project.private && (
              <div className="ms-2 rounded-circle p-1 bg-body-secondary d-flex align-items-center">
                <span className="material-symbols-outlined text-secondary fs-5">
                  lock
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
