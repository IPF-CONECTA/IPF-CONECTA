import { useEffect } from "react";
import { Nav, Footer, JobDetails } from "../components";

export const JobDetailsPage = (jobId) => {
  return (
    <>
      <JobDetails jobId={jobId} />
    </>
  );
};
