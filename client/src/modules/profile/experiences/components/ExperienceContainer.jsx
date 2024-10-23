import React, { useEffect, useState } from "react";
import { CreateExperienceModal } from "./CreateExperienceModal";
import { ExperienceCard } from "./ExperienceCard";
import { Link, useNavigate } from "react-router-dom";
export const ExperienceContainer = ({
  own,
  experiencesData,
  onExperienceSubmit,
  username,
}) => {
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState([]);
  const [openExperienceModal, setOpenExperienceModal] = useState(false);
  useEffect(() => {
    const experiences = experiencesData.slice(0, 3);
    setExperiences(experiences);
  }, [experiencesData]);

  return (
    <>
      <div className="about bg-body-tertiary w-100" id="experiencias">
        <div className="p-4">
          <div className="d-flex justify-content-between mb-2">
            <span className="fw-bold fs-5">Experiencias</span>
            {own && (
              <div className="d-flex">
                <button
                  type="button"
                  onClick={() => setOpenExperienceModal(true)}
                  className="btn w-100 d-flex p-0 align-items-center me-3 "
                >
                  <span className="material-symbols-outlined text-dark-emphasis">
                    add
                  </span>
                </button>
                <button
                  className="btn d-flex p-0 align-items-center"
                  onClick={() => navigate("experiencias")}
                >
                  <span className="material-symbols-outlined text-dark-emphasis">
                    edit
                  </span>
                </button>
                <CreateExperienceModal
                  openExperienceModal={openExperienceModal}
                  setOpenExperienceModal={setOpenExperienceModal}
                  onExperienceSubmit={onExperienceSubmit}
                  username={username}
                />
              </div>
            )}
          </div>
          <div>
            <ul className="list-group">
              {experiences.length >= 1 ? (
                experiences.map((experience, index) => (
                  <React.Fragment key={experience.id}>
                    <ExperienceCard
                      experience={experience}
                      edit={false}
                      own={own}
                    />
                    {index !== experiences.length - 1 && (
                      <hr className="text-body-tertiary" />
                    )}
                  </React.Fragment>
                ))
              ) : (
                <li className="list-group-item text-secondary">
                  Agrega experiencias a tu perfil.
                </li>
              )}
            </ul>
          </div>
        </div>
        {experiencesData.length > 3 && (
          <>
            <hr className="text-body-tertiary m-0" />

            <div className="w-100 d-flex justify-content-center py-2">
              <Link
                to={"experiencias"}
                className="fw-semibold p-0 text-body-tertiary text-decoration-none"
              >
                Ver todas las experiencias ({experiencesData.length})
              </Link>
            </div>
          </>
        )}
      </div>
      <hr className="m-0" />
    </>
  );
};
