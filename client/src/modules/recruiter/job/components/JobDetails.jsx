import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { useNoti } from "../../../../hooks/useNoti";
import { authContext } from "../../../../context/auth/Context";

import { authService } from "../../../auth/services/authService";
import styles from "../../../../../public/css/jobDetails.module.css";
import { BASE_URL } from "../../../../constants/BASE_URL";

export const JobDetails = ({ jobId }) => {
  const [postulate, setPostulate] = useState(false);
  const { authState } = useContext(authContext);
  const noti = useNoti();

  const [selectedJob, setSelectedJob] = useState(null);
  useEffect(() => {
    const getJobInfo = async () => {
      if (jobId != null) {
        try {
          const res = await axios.get(
            `http://localhost:4000/get-job/${jobId}`,
            {
              headers: {
                Authorization: `Bearer ${authService.getToken()}`,
              },
            }
          );
          setSelectedJob(res.data.job);
          setPostulate(res.data.postulated);
        } catch (error) {
          console.error("Error fetching job data:", error);
        }
      }
    };
    getJobInfo();
  }, [jobId]);

  const handleCreatePostulation = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/create-job-postulation",
        {
          profileId: authState.profile.id,
          jobId,
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
      noti(error.response.data.error, "error");
    }
  };

  return (
    <aside
      className={`${styles.asideJobDetails} d-flex flex-column align-items-center w-100`}
    >
      {selectedJob && (
        <div className={`${styles.jobDetails} w-100`}>
          <header className="mb-3 d-flex flex-row align-items-center w-100 justify-content-between">
            <div className="d-flex align-items-center">
              <img
                src={`${BASE_URL}/logoUrl/${selectedJob.company.logoUrl}`}
                className={`me-2 rounded-circle ${styles.roundedImage}`}
                crossOrigin="anonymous"
                height={40}
                width={40}
                alt="logo"
              />
              <span className="fs-5 text-secondary fw-semibold">
                {selectedJob.company.name}
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
                    <a
                      className="dropdown-item text-danger h-100 d-flex  fw-bold"
                      href="#"
                    >
                      <span className={`material-symbols-outlined pe-1 `}>
                        flag
                      </span>
                      <span>Reportar</span>
                    </a>
                  </li>
                </ul>
              </div>
              <button
                type="submit"
                className={`${styles.bookmark} btn p-0 me-2`}
              >
                <span className={`material-symbols-outlined ${styles.icon}`}>
                  bookmark
                </span>{" "}
              </button>

              {authState.role === "student" &&
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
                    className="btn btn-success"
                    onClick={handleCreatePostulation}
                  >
                    Postularse{" "}
                  </button>
                ))}
            </div>
          </header>
          <article>
            <div className="d-flex justify-content-between align-items-center">
              <span className="fs-3 fw-semibold text-light-emphasis">
                {selectedJob.title}
              </span>
              <span className="text-secondary">
                {selectedJob.modality.name}
              </span>
            </div>
            <p className="mb-1">
              <strong>Tipo de contrato: </strong>
              {selectedJob.contractType.name}
            </p>
            <div>
              <span className="fw-bold">Descripción</span>
              <div
                className="mt-1 p-2"
                dangerouslySetInnerHTML={{ __html: selectedJob.description }}
              />
            </div>
          </article>
          <footer className="d-flex flex-column align-items-start">
            <span className="fs-5 fw-semibold">Habilidades necesarias:</span>
            <ul>
              {selectedJob.jobSkills.map((jobSkill) => (
                <li key={jobSkill.skillId}>{jobSkill.skill.name}</li>
              ))}
            </ul>
          </footer>
        </div>
      )}
    </aside>
  );
};
0;
