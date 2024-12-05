import { useState } from "react";
import { BASE_URL } from "../../../../constants/BASE_URL";
import { Dialog } from "ckeditor5";
import { Profile } from "../../../profile/components/Profile";

export const JobPostulationCard = ({ postulation }) => {
  return (
    <li className="list-group-item mb-1 border w-100 mx-auto">
      <div className="column d-flex justify-content-between">
        <div className="d-flex">
          <img
            src={`${BASE_URL}/images/${postulation.profile.profilePic}`}
            crossOrigin="false"
            alt="profile pic"
            width={75}
            className="p-2 rounded-circle"
          />
          <div className="d-flex flex-column justify-content-center">
            <p>
              {postulation.profile.names + " " + postulation.profile.surnames}{" "}
              <span className="text-secondary" style={{ fontSize: "0.8rem" }}>
                @{postulation.profile.user.username}
              </span>
            </p>
            <p className="fw-semibold text-secondary text-break">
              {(postulation?.profile?.title && postulation?.profile?.title) ||
                (postulation?.profile?.about &&
                  postulation?.profile?.about?.slice(0, 50) + "...")}
            </p>
          </div>{" "}
        </div>

        <div className="d-flex">
          <div className="d-flex align-items-center me-2">
            <span
              className="material-symbols-outlined mx-3 "
              onClick={() => handleStatusClick(postulation.id)}
              style={{
                color: postulation.favorite ? "gold" : "",
                cursor: "pointer",
              }}
            >
              stars
            </span>
            <DialogProfile data={postulation.profile.user.username} />
          </div>

          <div className="ms-auto d-flex column"></div>
          <button
            onClick={() =>
              handleChatClick(
                postulation.profile.user.username,
                postulation.profile
              )
            }
            className="btn d-flex align-items-center p-0 h-100"
          >
            <span className="material-symbols-outlined fs-2 fw-light">
              chat
            </span>
          </button>
        </div>
      </div>
    </li>
  );
};

function DialogProfile({ data }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="btn btn-outline-dark"
        style={{ height: "fit-content" }}
      >
        Perfil
      </button>
      <Dialog maxWidth="md" open={open} onClose={() => setOpen(false)}>
        <Profile data={data} />
      </Dialog>
    </>
  );
}
