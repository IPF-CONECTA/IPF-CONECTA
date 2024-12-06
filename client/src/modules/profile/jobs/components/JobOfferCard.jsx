import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Switch } from "@mui/material";

import DOMPurify from "dompurify";
import { Dialog } from "@mui/material";
import styles from "../../../../../public/css/jobProfileCard.module.css";
import { BASE_URL } from "../../../../constants/BASE_URL";
import { getFullDate } from "../../../../helpers/getTime";
import { JobDetails } from "../../../recruiter/job/components/JobDetails";
import { JobForm } from "../components/JobForm";
import { jobPostulationsServices } from "../../../jobs/postulations/services/jobPostulationsServices";
import { GrNotes } from "react-icons/gr";
import { jobsServices } from "../services/jobsServices";
export const JobOfferCard = ({ jobOffer, own, edit, onJobUpdate }) => {
  const [openModal, setOpenModal] = useState(false);
  const [jobPostulationsNumber, setJobPostulationsNumber] = useState(0);
  const shortDescription =
    jobOffer.description?.length > 40
      ? `${jobOffer.description.substring(0, 100)}...`
      : jobOffer.description;

  useEffect(() => {
    jobPostulationsServices.getPostulationsByJobId(jobOffer.id).then((res) => {
      if (res.status === 200) {
        setJobPostulationsNumber(res.data.postulate.length);
      }
    });
  });

  const handleChangeJobStatus = async (jobId) => {
    const res = await jobsServices.changeJobStatus(jobId);
    if (res.status !== 200) {
    }
    onJobUpdate();
  };

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
          <button
            title="Editar trabajo"
            className="btn d-flex p-1 me-2"
            onClick={() => setOpenModal(true)}
          >
            <span className="material-symbols-outlined text-dark-emphasis">
              edit
            </span>
          </button>
          <div
            title="archivar"
            className="d-flex align-items-center border px-2 rounded-3"
          >
            <span className="material-symbols-outlined text-dark-emphasis">
              {jobOffer?.active ? "visibility" : "visibility_off"}
            </span>
            <Switch
              checked={jobOffer?.active}
              onChange={() => handleChangeJobStatus(jobOffer.id)}
              color="primary"
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>

          <Link
            to={`/empleo/${jobOffer.id}/postulaciones`}
            className="link-offset-1-hover text-decoration-none"
          >
            <button className="btn p-1 d-flex" title="Postulaciones">
              <span className="d-flex align-items-center gap-2">
                <GrNotes size={18} />
              </span>
            </button>
          </Link>
          <small className="fw-semibold">{jobPostulationsNumber}</small>
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
