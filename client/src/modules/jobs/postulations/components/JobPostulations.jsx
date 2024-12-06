import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Dialog, DialogContent } from "@mui/material";
import { jobPostulationsServices } from "../services/jobPostulationsServices";
import { BASE_URL } from "../../../../constants/BASE_URL";
import { Profile } from "../../../profile/components/Profile";
import { authContext } from "../../../../context/auth/Context";
import { Header } from "../../../profile/components/ProfileHeader";
import { getProfile } from "../../../feed/services/feedServices";
import { RecommendedAccounts } from "../../../feed/components/RecommendedAccounts";
import { jobsServices } from "../../../profile/jobs/services/jobsServices";
import { useChatContext } from "../../../../context/chat/ChatContext";
import { useNoti } from "../../../../hooks/useNoti";
import { chatService } from "../../../chat/services/chatService";

export const JobPostulations = () => {
  const { jobId } = useParams();
  const { authState } = useContext(authContext);
  const [profileData, setProfileData] = useState({});

  const [job, setJob] = useState();
  const { setChatId, setReceiver } = useChatContext();
  const navigate = useNavigate();
  const username = authState.user?.username;

  const handleChatClick = async (username, receiver) => {
    const res = await chatService.getChatId(username);
    if (res.status !== 200) {
      setChatId(null);
      navigate("/mensajes");

      return setReceiver(receiver);
    }
    setChatId(res.data.chatId);
    navigate("/mensajes");
  };

  const handleStatusClick = async (jobPostulationId) => {
    const res = await jobPostulationsServices.changeJobPostulationStatus(
      jobPostulationId
    );
    if (res.status !== 200) {
      return useNoti("error", res.error);
    }
    const updatedJob = job?.postulate?.map((postulation) => {
      if (postulation.id === jobPostulationId) {
        postulation.favorite = !postulation.favorite;
      }
      return postulation;
    });
    setJob({ ...job, postulate: updatedJob });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getProfile(username);
      setProfileData(res.data);
    };
    username && fetchProfile();
  }, [username]);

  useEffect(() => {
    const fetchJob = async () => {
      const res = await jobPostulationsServices.getPostulationsByJobId(jobId);
      setJob(res.data);
    };
    fetchJob();
  }, [jobId]);

  return (
    <div style={{ width: "65%" }} className="border rounded-4">
      {profileData && (
        <Header profileData={profileData} setProfileData={setProfileData} />
      )}
      <div className="bg-body-tertiary d-flex flex-column">
        <div className="d-flex p-4 align-items-center">
          <Link
            to={`/perfil/${authState.user?.username}/empleos`}
            className="btn d-flex align-items-center p-0 "
          >
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </Link>
          <span className="fs-5 fw-bold">
            Postulados de{" "}
            {job?.title?.length > 40
              ? job?.title?.slice(0, 40) + "..."
              : job?.title}
          </span>
        </div>

        {job?.postulate?.length > 0 ? (
          <>
            <div className="d-flex flex-column mx-5">
              <ul className="list-group list-group-flush ">
                {job?.postulate?.map((postulation, i) => (
                  <li
                    className="list-group-item mb-1 border w-100 mx-auto"
                    key={postulation.id + i}
                  >
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
                            {postulation.profile.names +
                              " " +
                              postulation.profile.surnames}{" "}
                            <span
                              className="text-secondary"
                              style={{ fontSize: "0.8rem" }}
                            >
                              @{postulation.profile.user.username}
                            </span>
                          </p>
                          <p className="fw-semibold text-secondary text-break">
                            {(postulation?.profile?.title &&
                              postulation?.profile?.title) ||
                              (postulation?.profile?.about &&
                                postulation?.profile?.about?.slice(0, 50) +
                                  "...")}
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

                          <DialogProfile
                            data={postulation.profile.user.username}
                          />
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
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="p-5">
            <Link
              to={`/perfil/${authState.user?.username}/empleos`}
              className="btn btn-outline-danger"
            >
              <span className="material-symbols-outlined fs-3 ">
                arrow_back
              </span>
            </Link>
            <h3 className="text-center fs-3 text">
              No hay postulaciones para este empleo.
            </h3>
            <img
              src="../../../../public/img/noPostulationsFounded.png"
              width={350}
              className="mx-auto d-block"
            />
          </div>
        )}
      </div>
    </div>
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
