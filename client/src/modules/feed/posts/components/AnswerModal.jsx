import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

import React, { useContext, useState } from "react";
import { BASE_URL } from "../../../../constants/BASE_URL";
import { getTime } from "../../../../helpers/getTime";
import styles from "../../../../../public/css/feed.module.css";
import { authContext } from "../../../../context/auth/Context";

export const AnswerModal = ({
  showAnswerModal,
  setShowAnswerModal,
  post,
  handleComment,
  isSubmitting,
}) => {
  const { authState } = useContext(authContext);
  const [content, setContent] = useState("");
  return (
    <Dialog
      open={Boolean(showAnswerModal)}
      onClose={() => setShowAnswerModal(false)}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "550px",
          },
        },
      }}
    >
      <DialogContent>
        <div className="header d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-start w-100">
            <img
              src={`${BASE_URL}/images/${post?.profile.profilePic}`}
              width={40}
              height={40}
              alt="profile pic"
              className="me-3 rounded-circle"
            />
            <div className="d-flex flex-column w-100 pe-3">
              <div className="d-flex w-100 justify-content-between align-items-stretch mb-2">
                <div className="d-flex flex-column">
                  <div className="fs-5 fw-semibold">
                    {post?.profile.names} {post?.profile.surnames}
                  </div>
                  <span className={`${styles.smallText} text-muted`}>
                    @{post?.profile.user.username}
                  </span>
                </div>
                <span className={`h-100 `}>{getTime(post?.createdAt)}</span>
              </div>
              <div>
                <DialogContentText>{post?.content}</DialogContentText>
              </div>
            </div>
            <button
              onClick={() => {
                setShowAnswerModal(false);
              }}
              className="material-symbols-outlined text-muted btn p-0"
            >
              close
            </button>
          </div>
        </div>
        <hr className="hr" />{" "}
        <div className="d-flex ">
          {authState?.user && authState?.user.profile.profilePic ? (
            <img
              src={`${BASE_URL}/images/${authState?.user.profile.profilePic}`}
              alt="your profile picture"
              width={40}
              height={40}
              className="me-3 rounded-circle"
            />
          ) : null}
          <input
            type="text"
            placeholder="Tu respuesta..."
            className={` border border-0 p-0 m-0`}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <button
          disabled={content.length === 0 || isSubmitting}
          className="btn btn-primary fw-bold text-light"
          onClick={(e) => handleComment(e, content)}
        >
          {isSubmitting ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Cargando...</span>
            </>
          ) : (
            "Responder"
          )}
        </button>
      </DialogActions>
    </Dialog>
  );
};
