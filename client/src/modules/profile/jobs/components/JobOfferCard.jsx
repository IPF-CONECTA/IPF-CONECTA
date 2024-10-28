import { useState } from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { Dialog } from "@mui/material";

import styles from "../../../../../public/css/jobProfileCard.module.css";

import { BASE_URL } from "../../../../constants/BASE_URL";
import { getFullDate, getTime } from "../../../../helpers/getTime";
import { JobDetails } from "../../../recruiter/job/components/JobDetails";

import { JobForm } from "../components/JobForm";
import { createSlug } from "../../../../helpers/createSlug";

export const JobOfferCard = ({
  jobOffer,
  description,
  own,
  edit,
  onJobUpdate,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const shortDescription =
    description?.length > 40
      ? `${description.substring(0, 100)}...`
      : description;

  return (
    <div className="d-flex justify-content-between w-100">
      <div className=" py-2 d-flex w-100">
        <div
          className="d-flex"
          onClick={() => setOpenModal(true)}
          style={{ cursor: "pointer" }}
        >
          <img
            src={`${BASE_URL}/logoUrl/${jobOffer.company.logoUrl}`}
            crossOrigin="anonymous"
            height={45}
            className="mx-2"
          />
          <div className="d-flex flex-column">
            <div className="d-flex gap-3">
              <span className="fw-semibold">{jobOffer.title}</span>
              <span
                className={`d-flex align-items-center text-secondary ${styles.smallText}`}
              >
                {getFullDate(jobOffer.createdAt)}
              </span>
            </div>

            <span className={`${styles.smallText} text-secondary`}>
              {jobOffer.company.name}
            </span>
            <div
              className={` ${styles.smallText}`}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(shortDescription),
              }}
            ></div>
          </div>
        </div>
      </div>

      {edit && own && (
        <div className="d-flex align-items-center">
          <button className="btn p-4 d-flex" onClick={() => setOpenModal(true)}>
            <span className="material-symbols-outlined text-dark-emphasis">
              edit
            </span>
          </button>
          <Link to={`/empleo/${jobOffer.id}/postulaciones`}>
            <button className="btn p-4 d-flex">
              <span class="material-symbols-outlined">visibility</span>
            </button>
          </Link>
        </div>
      )}

      {edit && own ? (
        <JobForm
          job={jobOffer}
          openModal={openModal}
          setOpenModal={setOpenModal}
          onJobUpdate={onJobUpdate}
        />
      ) : (
        <Dialog
          open={Boolean(openModal)}
          onClose={() => setOpenModal(false)}
          fullWidth
          maxWidth="md"
        >
          <div className="overflow-hidden">
            <JobDetails jobId={jobOffer.id} />
          </div>
        </Dialog>
      )}
    </div>
  );
};
