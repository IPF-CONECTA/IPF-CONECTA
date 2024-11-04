import React, { useEffect, useState } from "react";
import { EducationCard } from "./EducationCard";
import { EducationForm } from "./EducationForm";
import { useNavigate } from "react-router-dom";

export const AllEducationsContainer = ({
  own,
  educationsData,
  onEducationSubmit,
  username,
}) => {
  const navigate = useNavigate();
  const [educations, setEducations] = useState([]);
  const [openEducationModal, setOpenEducationModal] = useState(false);
  useEffect(() => {
    setEducations(educationsData);
  }, [educationsData]);

  return (
    <>
      <div className="bg-bg-body-tertiary w-100">
        <div className="p-4">
          <div className="d-flex justify-content-between mb-2">
            <div className="d-flex">
              <button
                className="btn p-0 d-flex align-items-center me-2"
                type="button"
                onClick={() => navigate(`/perfil/${username}`)}
              >
                <span className="material-symbols-outlined">
                  arrow_back_ios
                </span>
              </button>
              <span className="fs-5 fw-bold">Educaciones</span>
            </div>
            {own && (
              <div className="d-flex">
                <button
                  type="button"
                  onClick={() => setOpenEducationModal(true)}
                  className="btn w-100 d-flex p-0 align-items-center"
                >
                  <span className="material-symbols-outlined text-dark-emphasis">
                    add
                  </span>
                </button>
                <EducationForm
                  openEducationModal={openEducationModal}
                  setOpenEducationModal={setOpenEducationModal}
                  onEducationSubmit={onEducationSubmit}
                  username={username}
                />
              </div>
            )}
          </div>

          <ul className="list-group w-100">
            {educations?.length >= 1 ? (
              educations.map((education, index) => (
                <React.Fragment key={education.id}>
                  <EducationCard
                    onEducationSubmit={onEducationSubmit}
                    username={username}
                    education={education}
                    edit={true}
                    own={own}
                  />
                  {index !== educations.length - 1 && (
                    <hr className="text-bg-body-tertiary" />
                  )}
                </React.Fragment>
              ))
            ) : own ? (
              <li className="list-group-item text-secondary">
                Agrega formaciones academicas que hayas tenido a tu perfil
              </li>
            ) : (
              <li className="list-group-item text-secondary">
                Este usuario no tiene educaciones.
              </li>
            )}
          </ul>
        </div>
      </div>
      <hr className="m-0" />
    </>
  );
};
