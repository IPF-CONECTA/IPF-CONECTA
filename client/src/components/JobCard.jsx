import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { getTime } from "../helpers/getTime";
import { useNoti } from "../hooks/useNoti";
import axios from "axios";
import styles from "../../public/css/jobCard.module.css";
export const JobCard = ({ job, onClick, selectedJob }) => {
  console.log(selectedJob);
  console.log(job.id, "job id");
  return (
    <>
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
              alt=""
            />
            <p>{job.company.name}</p>
          </div>
          <button className={`${styles.bookmark} btn p-0`}>
            <span className={`material-symbols-outlined ${styles.icon}`}>
              bookmark
            </span>{" "}
          </button>
        </div>
        <p>{job.title}</p>
        <p>{job.location.state.name}</p>
        <div className="d-flex justify-content-between">
          <p className="grey">{job.modality.name}</p>
          <p className="pe-1">{getTime(job.createdAt)}</p>
        </div>
      </article>
    </>
  );
};
