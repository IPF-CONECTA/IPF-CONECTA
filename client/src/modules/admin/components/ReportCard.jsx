import React, { useState } from "react";
import { BASE_URL } from "../../../constants/BASE_URL";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { PiNotePencilBold } from "react-icons/pi";
import { ReportActionsModal } from "./ReportActionsModal";
import { ReportedContentModal } from "./ReportedContentModal";

export const ReportCard = ({ report, onResolve }) => {
  const [openReport, setOpenReport] = useState(false);
  const [openActions, setOpenActions] = useState(false);
  return (
    <>
      <tr>
        <td>{new Date(report.createdAt).toLocaleDateString()}</td>
        <td>{report?.reportableType}</td>
        <td>{report?.reportReason?.reason}</td>
        <td> {report?.reportReason?.severity}</td>
        <td>{report?.description.slice(0, 30)}</td>
        <td>
          <Link
            to={`/perfil/${report?.profile?.user?.username}`}
            target="_blank"
          >
            <img
              src={`${BASE_URL}/images/${report.profile.profilePic}`}
              alt="foto de perfil"
              title="Ver perfil"
              className="rounded-circle"
              height={30}
            />
          </Link>
        </td>
        <td>
          <span className="border rounded px-1">{report?.status}</span>
        </td>
        <td>
          <div className="d-flex gap-1">
            <button
              type="button"
              onClick={() => setOpenReport(true)}
              className="btn p-1 bg-dark text-white d-flex"
            >
              <FaEye />
            </button>
            <button
              onClick={() => setOpenActions(true)}
              type="button"
              className="btn p-1 bg-dark text-white d-flex"
            >
              <PiNotePencilBold />
            </button>
          </div>
        </td>
      </tr>

      <ReportActionsModal
        open={openActions}
        setOpen={setOpenActions}
        reportId={report.id}
        onResolve={onResolve}
      />
      <ReportedContentModal
        openReport={openReport}
        setOpenReport={setOpenReport}
        report={report}
      />
    </>
  );
};
