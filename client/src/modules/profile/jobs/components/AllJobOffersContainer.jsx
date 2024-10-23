import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { jobsServices } from "../services/jobsServices";
import { useNoti } from "../../../../hooks/useNoti";
import { JobOfferCard } from "./JobOfferCard";
import { getProfile } from "../../../feed/services/feedServices";

export const AllJobOffersContainer = ({ username, own }) => {
  const [profileData, setProfileData] = useState();
  const [jobOffers, setJobOffers] = useState([]);
  const noti = useNoti();
  const navigate = useNavigate();

  const fetchProfile = async () => {
    const res = await getProfile(username);
    if (res.status !== 200) {
      return noti(res.message, "error");
    }
    setProfileData(res.data);
  };

  const fetchJobOffers = async (username) => {
    const res = await jobsServices.getJobsByUsername(username);
    if (res.status !== 200) {
      return noti("error?", "error");
    }
    setJobOffers(res.data);
  };

  useEffect(() => {
    fetchProfile(username);
    fetchJobOffers(username);
  }, [username]);

  return (
    <>
      <div className="p-4 bg-body-tertiary">
        <div className="d-flex">
          <button
            className="btn p-0 d-flex align-items-center me-2"
            type="button"
            onClick={() => navigate(`/perfil/${username}`)}
          >
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </button>
          <span className="fs-5 fw-bold">Empleos</span>
        </div>
      </div>

      <div className="bg-body-tertiary ">
        {jobOffers?.map((jobOffer) => (
          <div className="d-flex  justify-content-evenly p-4" key={jobOffer.id}>
            <JobOfferCard
              jobOffer={jobOffer}
              description={jobOffer.description}
              own={profileData?.own}
              edit={true}
            />
          </div>
        ))}
      </div>
    </>
  );
};
