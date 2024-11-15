import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Dialog, DialogContent } from "@mui/material";
import { jobPostulationsServices } from "../services/jobPostulationsServices";
import { BASE_URL } from "../../../../constants/BASE_URL";
import { Profile } from "../../../profile/components/Profile";
import { authContext } from "../../../../context/auth/Context";
import { Header } from "../../../profile/components/ProfileHeader";
import { getProfile } from "../../../feed/services/feedServices";
import { RecommendedAccounts } from "../../../feed/components/RecommendedAccounts";
import { jobsServices } from "../../../profile/jobs/services/jobsServices";

export const JobPostulations = () => {
  const { jobId } = useParams();
  const { authState } = useContext(authContext);
  const [profileData, setProfileData] = useState({});
  const [username, setUsername] = useState("");
  const [job, setJob] = useState();

  const [postulations, setPostulations] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setUsername(authState.user?.username);
  }, [authState.user?.username]);

  useEffect(() => {
    const fetchJob = async () => {
      const res = await jobsServices.getJobById(jobId);
      setJob(res.data.job);
    };
    fetchJob();
  }, [jobId]);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getProfile(username);
      setProfileData(res.data);
    };
    username && fetchProfile();
  }, [username]);

  useEffect(() => {
    const fetchPostulations = async () => {
      const res = await jobPostulationsServices.getPostulationsByJobId(jobId);

      setPostulations(res.data);
    };
    fetchPostulations();
  }, [jobId]);

  return (
    <div className="d-flex justify-content-evenly p-5">
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
              {job?.title.length > 20
                ? job?.title.slice(0, 20) + "..."
                : job?.title}
            </span>
          </div>

          {postulations.length > 0 ? (
            <>
              <div className="d-flex flex-column mx-5">
                <ul className="list-group list-group-flush ">
                  {postulations.map((postulation) => (
                    <li
                      className="list-group-item mb-1 border w-100 mx-auto"
                      key={postulation.id}
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
                            <p></p>
                            <p className="fw-semibold text-secondary text-break">
                              {postulation?.profile.title ||
                                postulation?.profile.about.slice(0, 50) + "..."}
                            </p>
                          </div>
                        </div>

                        <div className="d-flex">
                          <div className="d-flex align-items-center me-2">
                            <button
                              onClick={handleClickOpen}
                              className="btn btn-outline-dark"
                              style={{ height: "fit-content" }}
                            >
                              Perfil
                            </button>
                          </div>
                          <Dialog
                            maxWidth="md"
                            open={open}
                            onClose={handleClose}
                          >
                            <DialogContent>
                              <Profile
                                data={postulation.profile.user.username}
                              />
                            </DialogContent>
                          </Dialog>
                          <div className="ms-auto d-flex column"></div>
                          <Link
                            to={`/chat/${postulation.profile.user.username}`}
                            className="btn d-flex align-items-center p-0 h-100"
                          >
                            <span className="material-symbols-outlined fs-2 fw-light">
                              chat
                            </span>
                          </Link>
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
      <RecommendedAccounts />
    </div>
  );
};
