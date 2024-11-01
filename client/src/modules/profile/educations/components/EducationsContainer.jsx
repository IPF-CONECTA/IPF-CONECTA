import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { EducationForm } from "./EducationForm";
import { EducationCard } from "./EducationCard";

export const EducationsContainer = ({
  own,
  educationsData,
  onEducationSubmit,
  username,
}) => {
  const navigate = useNavigate();

  const [educations, setEducations] = useState([]);
  const [openEducationModal, setOpenEducationModal] = useState(false);

  useEffect(() => {
    const educations = educationsData.slice(0, 3);
    setEducations(educations);
  }, [educationsData]);

  return (
    <div
      className="about bg-body-tertiary w-100 border-bottom"
      id="educaciones"
    >
      <div className="p-4">
        <div className="d-flex justify-content-between mb-2">
          <span className="fw-bold fs-5">Formaciones académicas</span>
          {own && (
            <div className="d-flex">
              <button
                type="button"
                onClick={() => setOpenEducationModal(true)}
                className="btn w-100 d-flex p-0 align-items-center me-3 "
              >
                <span className="material-symbols-outlined text-dark-emphasis">
                  add
                </span>
              </button>
              <button
                className="btn d-flex p-0 align-items-center"
                onClick={() => navigate("formaciones")}
              >
                <span className="material-symbols-outlined text-dark-emphasis">
                  edit
                </span>
              </button>
              <EducationForm
                onEducationSubmit={onEducationSubmit}
                openEducationModal={openEducationModal}
                setOpenEducationModal={setOpenEducationModal}
                username={username}
              />
            </div>
          )}
        </div>
        <div>
          <ul className="list-group">
            {educations.length >= 1 ? (
              educations.map((education, index) => (
                <React.Fragment key={education.id}>
                  <EducationCard education={education} edit={false} own={own} />
                  {index !== educations.length - 1 && (
                    <hr className="text-body-tertiary" />
                  )}
                </React.Fragment>
              ))
            ) : (
              <li className="list-group-item text-secondary">
                Agrega formaciones a tu perfil.
              </li>
            )}
          </ul>
        </div>
      </div>
      {educationsData.length > 3 && (
        <>
          <hr className="text-body-tertiary m-0" />

          <div className="w-100 d-flex justify-content-center py-2">
            <Link
              to={"formaciones"}
              className="fw-semibold p-0 text-body-tertiary text-decoration-none"
            >
              Ver todas las formaciones ({educationsData.length})
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
