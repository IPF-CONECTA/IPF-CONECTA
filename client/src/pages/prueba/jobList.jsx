import React, { useState } from "react";
import styles from "./css/jobsList.module.css";
import JobDetail from "./jobDet";

const JobList = ({ jobs, companies }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const jobsPerPage = 10;

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  return (
    <div className={styles.container}>
      <h2>Listado de Trabajos</h2>
      <ul className={styles.jobList}>
        {currentJobs.map((job, index) => (
          <li key={index} className={styles.jobItem}>
            {job.companyImage && (
              <img
                src={job.companyImage}
                alt={job.company}
                className={styles.companyImage}
              />
            )}
            <div className={styles.jobDetails}>
              <div className={styles.jobHeader}>
                <h3>{job.title}</h3>
                <p><strong>Posición:</strong> {job.position}</p>
                <p><strong>Empresa:</strong> {job.company}</p>
                {job.location && (
                  <p><strong>Ubicación:</strong> {job.location}</p>
                )}
              </div>
              <p><strong>Descripción:</strong> {job.description}</p>
              <button 
                className={styles.detailsButton}
                onClick={() => handleViewDetails(job)}
              >
                Ver más detalles
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? styles.active : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {showModal && selectedJob && (
        <JobDetail
          job={selectedJob}
          company={companies.find(c => c.name === selectedJob.company)}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default JobList;
