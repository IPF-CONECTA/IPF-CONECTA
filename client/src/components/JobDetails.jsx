import { useState, useEffect } from "react";
import axios from "axios";

import styles from "../../public/css/jobDetails.module.css";
import { useLocation } from "react-router-dom";

export const JobDetails = ({ jobId }) => {
  const location = useLocation();

  const [selectedJob, setSelectedJob] = useState(null);
  useEffect(() => {
    const getJobInfo = async () => {
      if (jobId != null) {
        try {
          const res = await axios.get(`http://localhost:4000/get-job/${jobId}`);
          setSelectedJob(res.data);
        } catch (error) {
          console.error("Error fetching job data:", error);
        }
      }
    };
    getJobInfo();
  }, [jobId]);

  function create() {
    axios
      .post("http://localhost:4000/create-job-postulation")
      .then((response) => {
        console.log(response);
      });
  }

  return (
    <aside
      className={`${styles.asideJobDetails} d-flex flex-column align-items-center w-100`}
    >
      {selectedJob && (
        <div className={`${styles.jobDetails} w-100`}>
          <header className="mb-3 d-flex flex-row align-items-center w-100 justify-content-between">
            <div className="d-flex">
              <img
                src={selectedJob.company.logoUrl}
                className="me-3 rounded-pill"
                height={"35px"}
                alt="logo"
              />
              <h3 className="m-0">{selectedJob.company.name}</h3>
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
              <button className="btn btn-success" onClick={create}>
                Postularse
              </button>
            </div>
          </header>
          <article>
            <h2>{selectedJob.title}</h2>
            <p>{selectedJob.description}</p>
            <p>
              <strong>Modalidad: </strong>
              {selectedJob.modality.name}
            </p>

            <p>
              <strong>Tipo de contrato: </strong>
              {selectedJob.contractType.name}
            </p>
          </article>
          <footer className="d-flex flex-column align-items-start">
            <h4>Habilidades necesarias:</h4>
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
