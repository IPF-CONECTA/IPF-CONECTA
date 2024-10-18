import { Link, useNavigate } from "react-router-dom";
import { JobOfferCard } from "./JobOfferCard";
import { useContext } from "react";
import { authContext } from "../../../../context/auth/Context";

export const JobOffers = ({ jobOffersData }) => {
  const { authState } = useContext(authContext);
  const navigate = useNavigate();

  return (
    <div className="">
      <div className="d-flex justify-content-between w-100 mb-2">
        <span className="fs-5 fw-bold">Ofertas de trabajo</span>
      </div>
      <button
        onClick={() => navigate("/nuevo-empleo")}
        className="btn d-flex p-0 align-items-center me-3 "
      >
        <span className="text-end material-symbols-outlined text-dark-emphasis">
          add
        </span>
      </button>
      <div className="d-flex flex-column">
        {jobOffersData.slice(0, 3).map((jobOfferdata) => {
          return (
            <JobOfferCard
              key={jobOfferdata.id}
              jobOffer={jobOfferdata}
              description={jobOfferdata.description}
            />
          );
        })}
      </div>
      {jobOffersData.length > 3 && (
        <div className="w-100 d-flex justify-content-end">
          <Link
            to={`/perfil/${authState.user?.username}/empleos`}
            className="text-dark-emphasis"
          >
            <button className="btn d-flex p-0 align-items-center">
              <button className="d-flex btn btn-outline-dark">
                Ver todos los empleos
              </button>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};
