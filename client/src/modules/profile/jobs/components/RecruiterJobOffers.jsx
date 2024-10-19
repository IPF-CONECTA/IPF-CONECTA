import { useEffect, useState } from "react";
import { jobsServices } from "../services/jobsServices";
import { useNoti } from "../../../../hooks/useNoti";
import { JobOfferCard } from "./JobOfferCard";
import { getProfile } from "../../../feed/services/feedServices";

export default function RecruiterJobOffers({ username, own }) {
  const [profileData, setProfileData] = useState();
  const [jobOffers, setJobOffers] = useState([]);
  const noti = useNoti();

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
    <div>
      <h3 className="text-center fw-semibold p-5">
        {profileData?.own ? "Tus ofertas publicadas" : `Ofertas de ${username}`}
      </h3>
      <div className="row">
        {jobOffers?.map((jobOffer) => (
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={jobOffer.id}>
            <JobOfferCard
              jobOffer={jobOffer}
              description={jobOffer.description}
              own={profileData?.own}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
