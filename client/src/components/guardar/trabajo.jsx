import React, { useState } from "react";
import styles from "./trabajo.module.css";
import { useJobContext } from './jobContext'; // Importa el hook del contexto

export const Trabajo = ({ job, onClick, selectedJob }) => {
  const { savedJobs, appliedJobs, toggleSaveJob, applyToJob } = useJobContext();
  
  const isSaved = savedJobs.has(job.id);
  const isApplied = appliedJobs.has(job.id);

  const getTime = (date) => {
    const timeDiff = new Date() - new Date(date);
    const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return `${daysAgo} days ago`;
  };

  return (
    <article
      className={
        selectedJob === job.id
          ? `${styles.selectedCard} p-3 w-100`
          : `${styles.jobCard} p-3 w-100`
      }
      onClick={onClick}
    >
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <img
            src={job.company.logoUrl}
            className="pe-2"
            height={"20px"}
            alt="Company Logo"
          />
          <p>{job.company.name}</p>
        </div>
        <button className={`${styles.bookmark} btn p-0`} onClick={() => toggleSaveJob(job.id)}>
          <span className={`material-symbols-outlined ${styles.icon}`}>
            {isSaved ? "bookmark" : "bookmark_border"}
          </span>
        </button>
      </div>
      <p>{job.title}</p>
      <div className="d-flex justify-content-between">
        <p className="grey">{job.modality.name}</p>
        <p className="pe-1">{getTime(job.createdAt)}</p>
      </div>

      <div className="d-flex justify-content-between mt-2">
        <button
          className="btn btn-primary"
          onClick={() => applyToJob(job.id)}
          disabled={isApplied}
        >
          {isApplied ? "Applied" : "Apply"}
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => toggleSaveJob(job.id)}
        >
          {isSaved ? "Saved" : "Save"}
        </button>
      </div>
    </article>
  );
};
