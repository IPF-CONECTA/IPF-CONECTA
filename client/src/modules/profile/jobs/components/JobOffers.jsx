import { Link, useNavigate } from "react-router-dom";
import { JobOfferCard } from "./JobOfferCard";
import { useState } from "react";
import { JobForm } from "../components/JobForm";

export const JobOffers = ({ jobOffersData, own, onJobUpdate }) => {
  const navigate = useNavigate();
  const [openJobOfferModal, setOpenJobOfferModal] = useState(false);

  return (
    <div className="border-bottom">
      <div className="p-4">
        <div className="d-flex justify-content-between w-100 mb-2">
          <span className="fw-bold fs-5">Empleos</span>
          {own && (
            <div className="d-flex">
              <button
                onClick={() => setOpenJobOfferModal(true)}
                className="btn d-flex p-0 align-items-center me-3 "
              >
                <span className="text-end material-symbols-outlined text-dark-emphasis">
                  add
                </span>
              </button>
              <JobForm
                onJobUpdate={onJobUpdate}
                openModal={openJobOfferModal}
                setOpenModal={setOpenJobOfferModal}
              />
              <button
                className="btn d-flex p-0 align-items-center"
                onClick={() => navigate("empleos")}
              >
                <span className="material-symbols-outlined text-dark-emphasis">
                  edit
                </span>
              </button>
            </div>
          )}
        </div>
        <div className="d-flex flex-column">
          {jobOffersData.slice(0, 3).map((job, index) => {
            return (
              <div key={index}>
                <JobOfferCard
                  jobOffer={job}
                  description={job.description}
                  edit={false}
                  own={own}
                />
                {index !== jobOffersData.slice(0, 3).length - 1 && (
                  <hr className="text-secondary" />
                )}
              </div>
            );
          })}
        </div>
      </div>
      {jobOffersData?.length > 3 && (
        <div className="d-flex justify-content-center py-2 border-top">
          <Link
            className="fw-semibold text-body-tertiary text-decoration-none"
            to={`empleos`}
          >
            <span>Ver todos los empleos ({jobOffersData.length})</span>
          </Link>
        </div>
      )}
    </div>
  );
};
