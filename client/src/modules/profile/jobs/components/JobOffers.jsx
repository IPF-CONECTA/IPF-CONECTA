import { Link, useNavigate } from "react-router-dom";
import { JobOfferCard } from "./JobOfferCard";

export const JobOffers = ({ jobOffersData, own, username }) => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between w-100 mb-2">
        <span className="fs-5 fw-bold">
          {own ? "Tus ofertas de trabajo" : `Ofertas de ${username}`}
        </span>
        {own && (
          <button
            onClick={() => navigate("/nuevo-empleo")}
            className="btn d-flex p-0 align-items-center me-3 "
          >
            <span className="text-end material-symbols-outlined text-dark-emphasis">
              add
            </span>
          </button>
        )}
      </div>
      <div className="d-flex flex-column">
        {jobOffersData?.slice(0, 3).map((jobOfferdata) => {
          return (
            <JobOfferCard
              key={jobOfferdata.id}
              jobOffer={jobOfferdata}
              description={jobOfferdata.description}
              own={own}
            />
          );
        })}
      </div>
      {jobOffersData?.length > 3 && (
        <div className="d-flex justify-content-center p-2">
          <Link to={`/perfil/${username}/empleos`}>
            <span className="btn btn-outline-dark">
              {own
                ? "Ver todas tus ofertas publicadas"
                : `ver todas las ofertas de ${username}`}
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};
