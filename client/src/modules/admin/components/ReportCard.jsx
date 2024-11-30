import React, { useState } from "react";
import { BASE_URL } from "../../../constants/BASE_URL";
import { getFullDate } from "../../../helpers/getTime";
import { FaEye } from "react-icons/fa";
import { Modal } from "@mui/material";
import { Post } from "../../feed/posts/components/Post";
import { Comments } from "../../feed/posts/components/Comments";
import { Link } from "react-router-dom";

export const ReportCard = ({ report }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <tr>
        <td>{getFullDate(report.createdAt)}</td>
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
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="btn p-1 bg-dark text-white d-flex"
          >
            <FaEye />
          </button>
        </td>
      </tr>

      <Modal
        className="d-flex align-items-center justify-content-center"
        open={open}
        onClose={() => setOpen(false)}
      >
        {report?.reportableType == "post" ? (
          <div className="w-50 rounded-3 overflow-hidden">
            <Post postId={report?.reportableId} details={true} />
            <Comments postId={report?.reportableId} />
          </div>
        ) : (
          <div>hola</div>
        )}
      </Modal>
    </>
  );
};
