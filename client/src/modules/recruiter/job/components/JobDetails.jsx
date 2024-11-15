import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNoti } from "../../../../hooks/useNoti";
import { authContext } from "../../../../context/auth/Context";
import { authService } from "../../../auth/services/authService";
import styles from "../../../../../public/css/jobDetails.module.css";
import { BASE_URL } from "../../../../constants/BASE_URL";
import { Link, useNavigate } from "react-router-dom";
import { Dialog } from "@mui/material";
import { getTime } from "../../../../helpers/getTime";
import { getJobInfo } from "../services/jobServices";
import { ReportModal } from "../../../app/components/ReportModal";

export const JobDetails = ({ jobId }) => {
  const [openReportModal, setOpenReportModal] = useState(false);
  const [postulate, setPostulate] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const navigate = useNavigate();
  const { authState } = useContext(authContext);
  const noti = useNoti();
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getJob = async () => {
      if (jobId != null) {
        try {
          setLoading(true);
          const res = await getJobInfo(jobId, authState.isLogged);
          console.log(res.data);
          if (res.status !== 200) {
            noti("hubo un error");
          }

          setSelectedJob(res.data.job);
          setPostulate(res.data.postulated);
        } catch (error) {
          console.error("Error fetching job data:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    getJob();
  }, [jobId]);

  const handleCreatePostulation = async (id) => {
    if (!authState.isLogged) {
      noti("Inicia sesión para postularte", "info");
      navigate("/iniciar-sesion");
      return;
    }
    try {
      if (selectedJob.applicationLink) {
        navigate(selectedJob.applicationLink);
      }
      const response = await axios.post(
        "http://localhost:4000/create-job-postulation",
        {
          profileId: authState.user.profile.id,
          jobId: id,
        },
        {
          headers: {
            authorization: `Bearer ${authService.getToken()}`,
          },
        }
      );
      setPostulate(true);
      noti(response.data.message, "success");
    } catch (error) {
      console.log(error);
      noti(error.response.data.error, "error");
    }
  };
  if (loading) {
    return (
      <aside className={`${styles.asideJobDetails}`}>
        <div className="d-flex justify-content-center my-3">
          <span
            className="spinner-border"
            role="status"
            aria-hidden="true"
          ></span>
        </div>
      </aside>
    );
  }

  console.log(selectedJob.job);

  return (
    selectedJob && (
      <aside className={`${styles.asideJobDetails} `}>
        <div className={`${styles.jobDetails} w-100 rounded`}>
          <header className="mb-2 d-flex flex-row align-items-center w-100 justify-content-between">
            <div className="d-flex align-items-center">
              <img
                src={`${BASE_URL}/logoUrl/${selectedJob?.company?.logoUrl}`}
                className={`me-2 rounded-circle ${styles.roundedImage}`}
                height={40}
                width={40}
                alt="logo"
              />
              <span className="fs-5 fw-semibold">
                {selectedJob?.company?.name}
              </span>
            </div>
            <div className="d-flex flex-row justify-content-between align-items-center">
              <div className="dropdown me-2">
                <button
                  className={`btn dropdown-toggle ${styles.noCaret} p-0 d-flex `}
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="material-symbols-outlined">more_horiz</span>
                </button>
                <ul className={`dropdown-menu dropdown-menu-end`}>
                  <li className="d-flex flex-column">
                    <button
                      onClick={() => setOpenReportModal(true)}
                      className="dropdown-item text-danger h-100 d-flex  fw-semibold"
                    >
                      <span className={`material-symbols-outlined pe-1 `}>
                        flag
                      </span>
                      <span>Reportar</span>
                    </button>
                  </li>
                </ul>
              </div>
              <ReportModal
                openModal={openReportModal}
                setOpenModal={setOpenReportModal}
                reportable="trabajo"
              />
              <button
                type="submit"
                className={`${styles.bookmark} btn p-0 me-2`}
              >
                <span className={`material-symbols-outlined ${styles.icon}`}>
                  bookmark
                </span>{" "}
              </button>

              {authState.role !== "recruiter" &&
                (postulate ? (
                  <button
                    disabled
                    type="submit"
                    className="btn btn-outline-success "
                    onClick={() => setPostulate(false)}
                  >
                    Postulado{" "}
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-success fw-semibold"
                    onClick={() => handleCreatePostulation(selectedJob?.id)}
                  >
                    Postularse{" "}
                  </button>
                ))}
            </div>
          </header>
          <article>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fs-4 fw-semibold ">{selectedJob?.title}</span>
              <div className="d-flex flex-column align-items-end">
                <span>{selectedJob?.location}</span>
                <span className={styles.smallText}>
                  hace {getTime(selectedJob?.createdAt)}
                </span>
              </div>
            </div>
            <div className="mb-3">
              <p className="mb-1">
                <span className="fw-semibold d-flex">
                  <span className="material-symbols-outlined me-2">work</span>
                  Tipo de contrato:{" "}
                  <span className="fw-normal ms-2">
                    {selectedJob?.contractType?.name}
                  </span>
                </span>
              </p>
              <p className="d-flex align-items-center fw-semibold">
                <span className="material-symbols-outlined me-2">public</span>
                Modalidad:{" "}
                <span className="ps-2 fw-normal">
                  {selectedJob?.modality?.name}
                </span>
              </p>
            </div>
            <div className="mb-3 " style={{ width: "fit-content" }}>
              <span className="fw-semibold ">Publicado por</span>
              <div className="d-flex align-items-center mt-2 border rounded p-2">
                <img
                  className="me-2 rounded-circle"
                  src={`${BASE_URL}/images/${selectedJob?.profile?.profilePic}`}
                  alt="foto de perfil"
                  height={50}
                />
                <div className="d-flex flex-column me-4">
                  <span className="fw-semibold fs-5">
                    {selectedJob?.profile?.names}{" "}
                    {selectedJob?.profile?.surnames}
                  </span>
                  <span className={`text-secondary  ${styles.smallText}`}>
                    @{selectedJob?.profile?.user?.username}
                  </span>
                </div>
                <Link
                  to={`/perfil/${selectedJob?.profile?.user?.username}`}
                  className={`btn btn-outline-info fw-semibold ${styles.verPerfil}`}
                >
                  Ver perfil
                </Link>
              </div>
            </div>
            <div>
              {selectedJob?.description && (
                <>
                  <span className="fw-semibold">Descripción</span>
                  <div
                    className="mt-1 p-2"
                    dangerouslySetInnerHTML={{
                      __html: selectedJob?.description
                        .replace(/<strong>/g, '<span class="fw-semibold">')
                        .replace(/<\/strong>/g, "</span>"),
                    }}
                  />
                </>
              )}
            </div>
          </article>
          <footer className="d-flex flex-column align-items-start">
            <div>
              <span className="fs-5 fw-semibold">
                Habilidades necesarias:{" "}
                <span className="text-secondary">
                  ({selectedJob?.skills?.length})
                </span>
              </span>
              <ul className="list-unstyled d-flex gap-2 mt-2">
                {selectedJob?.skills?.slice(0, 3).map((jobSkill) => (
                  <li
                    className="bg-body-tertiary px-2  mb-2 d-flex justify-content-center align-items-center text-center rounded border fw-semibold"
                    key={jobSkill.id}
                  >
                    {jobSkill.name}
                  </li>
                ))}
                {selectedJob?.skills?.length > 3 && (
                  <>
                    <li
                      className="bg-body-tertiary px-2  mb-2 d-flex justify-content-center align-items-center text-center rounded border fw-semibold"
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowAllSkills(true)}
                    >
                      y {selectedJob?.skills?.length - 3} más...
                    </li>
                    <Dialog
                      open={showAllSkills}
                      onClose={() => setShowAllSkills(false)}
                      fullWidth
                      maxWidth="xs"
                    >
                      <div className="p-3">
                        <div className="d-flex justify-content-between mb-3">
                          <span className="fw-bold fs-5 ">
                            Todas las habilidades
                          </span>
                          <button
                            onClick={() => setShowAllSkills(false)}
                            className="btn d-flex p-0 align-items-center"
                          >
                            <span className="material-symbols-outlined text-dark-emphasis">
                              close
                            </span>
                          </button>
                        </div>
                        <ul className="gap-2 list-group list-group-flush">
                          {selectedJob?.skills?.map((skill) => (
                            <li
                              key={skill?.id}
                              className="list-unstyled list-group-item"
                            >
                              {skill?.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Dialog>
                  </>
                )}
              </ul>
            </div>
          </footer>
        </div>
      </aside>
    )
  );
};
