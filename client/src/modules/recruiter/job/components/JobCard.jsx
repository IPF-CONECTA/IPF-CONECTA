import { getTime } from "../../../../helpers/getTime";
import { BASE_URL } from "../../../../constants/BASE_URL";
import styles from "../../../../../public/css/jobCard.module.css";

export const JobCard = ({ job, onClick, selectedJob }) => {
  return (
    <>
      <article
        className={
          selectedJob === job.id
            ? `${styles.selectedCard} p-3 w-100 shadow-sm border rounded`
            : `${styles.jobCard} p-3 w-100 shadow-sm border rounded`
        }
        onClick={onClick}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img
              src={`${BASE_URL}/logoUrl/${job.company?.logoUrl}`}
              crossOrigin="anonymous"
              className={`me-2 rounded-circle ${styles.roundedImage}`}
              height={25}
              width={25}
              alt=""
            />
            <span className={`${styles.smallText}`}>{job.company?.name}</span>
          </div>
          <button className={`${styles.bookmark} btn p-0`}>
            <span className={`material-symbols-outlined ${styles.icon}`}>
              bookmark
            </span>{" "}
          </button>
        </div>
        <span className="">{job.title}</span>
        <div className="d-flex justify-content-between mt-2">
          <span className={`text-secondary ${styles.smallText}`}>
            {job.modality?.name}
          </span>
          <span className={`me-1 text-secondary ${styles.smallText}`}>
            {getTime(job.createdAt)}
          </span>
        </div>
      </article>
    </>
  );
};
