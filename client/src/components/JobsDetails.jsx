import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../public/css/jobDetails.module.css";
export const JobDetails = ({ jobId }) => {
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
                className="pe-3"
                height={"35px"}
                alt="logo"
              />
              <h3 className="m-0">{selectedJob.company.name}</h3>
            </div>
            <div className="d-flex flex-row w-25 justify-content-between align-items-center">
              <div className="dropdown">
                <button
                  className={`btn dropdown-toggle ${styles.noCaret} p-0 d-flex `}
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span class="material-symbols-outlined">more_horiz</span>
                </button>
                <ul className={`dropdown-menu `}>
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
              <button type="submit" className={`${styles.bookmark} btn p-0 `}>
                <span className={`material-symbols-outlined ${styles.icon}`}>
                  bookmark
                </span>{" "}
              </button>
              <button className="btn ps-2 btn-success">
                <strong>Postularse</strong>
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

import { Link, useParams } from "react-router-dom";
import "../styles/JobDetails.css";

import { Nav } from "../pages/Nav.jsx";

// export const JobDetails = () => {
//   const { id } = useParams();

//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getJobInfo = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/get-job/${id}`);
//         setJob(response.data);
//       } catch (error) {
//         console.error("Error fetching job data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getJobInfo();
//   }, [id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!job) {
//     return <div>Job not found</div>;
//   }

//   console.log(job.company.logoUrl);

//   return (
//     <>
//       <Nav />

//       <div className="container">
//         <div className="header">
//           <div>
//             <h1>Detalles de la oferta de trabajo</h1>
//             <h2 className="grey">{job.title}</h2>
//           </div>
//           <div>
//             <img
//               src={`${job.company.logoUrl}`}
//               alt={job.company.name}
//               className="logo"
//             />
//           </div>
//         </div>

//         <div className="header">
//           <div>
//             <h2>Compañía</h2>
//             <div className="grey">
//               <h3>Nombre: {job.company.name}</h3>
//               <p>
//                 Lugar:{" "}
//                 {job.company.cityID ?? " No especificado por la empresa-"}
//               </p>
//               <p></p>
//               <p>Dirección: {job.company.address}</p>
//               <p>
//                 Cuenta con al rededor de: {job.company.cantEmployees} empleados
//               </p>
//               <p>
//                 Industria a la que pertenece: {job.company.companyIndustry.name}
//               </p>
//             </div>
//           </div>
//           <div>
//             <h4>Recruiter</h4>
//             <div className="recruiter-heading">
//               <img
//                 src={job.user.profilePic}
//                 alt="Recruiter profile"
//                 className="icon"
//               />
//             </div>
//             <div>
//               <div className="grey"> {job.user.names}</div>
//               <div className="grey">{job.user.surnames}</div>
//             </div>
//           </div>
//         </div>

//         <h4>Oferta de Trabajo:</h4>
//         <div className="joboffer grey">
//           <p>Descripción del trabajo:{job.description}</p>
//           <p>Modalidad: {job.modality.name}</p>
//           <p>Tipo de contrato: {job.contractType.name}</p>
//         </div>
//         <h4>Requisitos:</h4>

//         <ul className="grey">
//           {job.jobSkills.map((jobSkill) => (
//             <li key={jobSkill.skillId}>{jobSkill.skill.name}</li>
//           ))}
//         </ul>
//         <div>
//           <br></br>
//           <Link to="/trabajos">
//             <button>Volver</button>
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// };
