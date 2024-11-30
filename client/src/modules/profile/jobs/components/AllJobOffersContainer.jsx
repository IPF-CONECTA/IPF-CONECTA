import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { jobsServices } from "../services/jobsServices";
import { useNoti } from "../../../../hooks/useNoti";
import { JobOfferCard } from "./JobOfferCard";
import { getProfile } from "../../../feed/services/feedServices";
import { JobForm } from "./JobForm";

export const AllJobOffersContainer = ({ username }) => {
  const [profileData, setProfileData] = useState();
  const [jobOffers, setJobOffers] = useState([]);
  const [own, setOwn] = useState(false);
  const noti = useNoti();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const fetchProfile = async () => {
    const res = await getProfile(username);
    if (res.status !== 200) {
      return noti(res.message, "error");
    }
    setProfileData(res.data);
    setOwn(res.data.own);
  };

  const fetchJobOffers = async () => {
    const res = await jobsServices.getJobsByUsername(username);
    if (res.status !== 200) {
      return noti("error?", "error");
    }
    setJobOffers(res.data);
  };

  useEffect(() => {
    fetchProfile();
    fetchJobOffers();
  }, [username]);

  return (
    <div className="p-4 bg-body-tertiary">
      <div>
        <div className="d-flex justify-content-between">
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
          {own && (
            <button
              className="btn p-0 d-flex"
              type="button"
              onClick={() => setOpenModal(true)}
            >
              <span className="text-end material-symbols-outlined text-dark-emphasis">
                add
              </span>
            </button>
          )}
        </div>
      </div>

      <ul className="list-group list-group-flush">
        {jobOffers.length > 0 ? (
          jobOffers?.map((jobOffer) => (
            <li
              className="list-group-item d-flex justify-content-evenly p-4 bg-body-tertiary"
              key={jobOffer.id}
            >
              <JobOfferCard
                onJobUpdate={fetchJobOffers}
                jobOffer={jobOffer}
                own={profileData?.own}
                edit={own ? true : false}
              />
            </li>
          ))
        ) : (
          <li className="list-group-item bg-body-tertiary w-100 d-flex justify-content-center">
            {own
              ? "No hay empleos disponibles, publica uno"
              : "No hay empleos disponibles"}
          </li>
        )}
      </ul>
      {own && (
        <JobForm
          openModal={openModal}
          setOpenModal={setOpenModal}
          onJobUpdate={fetchJobOffers}
        />
      )}
    </div>
  );
};
