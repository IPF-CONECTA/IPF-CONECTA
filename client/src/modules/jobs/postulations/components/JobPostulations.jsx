import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Dialog, DialogContent } from "@mui/material";

import { jobPostulationsServices } from "../services/jobPostulationsServices";
import { BASE_URL } from "../../../../constants/BASE_URL";
import { Profile } from "../../../profile/components/Profile";

export const JobPostulations = () => {
  const { jobId } = useParams();

  const [postulations, setPostulations] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchPostulations = async () => {
      const res = await jobPostulationsServices.getPostulationsByJobId(jobId);

      setPostulations(res.data);
    };
    fetchPostulations();
  }, [jobId]);

  console.log(postulations);
  return (
    <div className="d-flex flex-column align-baseline">
      <h4>Postulaciones del empleo</h4>
      {postulations.length > 0 ? (
        <ul class="list-group list-group-flush">
          {postulations.map((postulation) => (
            <li class="list-group-item" key={postulation.id}>
              <div className="d-flex flex-row">
                <div>
                  <img
                    src={`${BASE_URL}/images/${postulation.profile.profilePic}`}
                    crossOrigin="false"
                    alt="profile pic"
                    width={50}
                    className="p-2"
                    onClick={handleClickOpen}
                  />
                  <Dialog maxWidth="md" open={open} onClose={handleClose}>
                    <DialogContent>
                      <Profile data={postulation.profile.user.username} />
                    </DialogContent>
                  </Dialog>
                </div>
                <div>
                  <p>
                    <strong> Usuario</strong>:{" "}
                    {postulation.profile.user.username}
                  </p>
                  <p>
                    {postulation.profile.names +
                      " " +
                      postulation.profile.surnames}
                  </p>
                  <p></p>
                  <p>
                    <strong>Acerca de: </strong>
                    {postulation.profile.about
                      ? postulation.profile.about
                      : "No hay información"}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h1>No hay postulaciones :C</h1>
      )}
    </div>
  );
};
