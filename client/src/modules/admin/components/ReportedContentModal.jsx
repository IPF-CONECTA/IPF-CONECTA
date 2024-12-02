import { Modal } from "@mui/material";
import React from "react";
import { Post } from "../../feed/posts/components/Post";
import { Comments } from "../../feed/posts/components/Comments";
import { JobDetails } from "../../recruiter/job/components/JobDetails";

export const ReportedContentModal = ({ openReport, setOpenReport, report }) => {
  return (
    <Modal
      className="d-flex align-items-center justify-content-center"
      open={openReport}
      onClose={() => setOpenReport(false)}
    >
      <div className="w-50 rounded-3 d-flex justify-content-center">
        {report?.reportableType == "post" ? (
          <div className="overflow-auto w-75">
            <Post postId={report?.reportableId} details={true} />
            <Comments postId={report?.reportableId} />
          </div>
        ) : (
          <JobDetails jobId={report?.reportableId} />
        )}
      </div>
    </Modal>
  );
};
