import React, { useEffect, useState } from "react";
import { CreateExperienceModal } from "./CreateExperienceModal";
import { ExperienceCard } from "./ExperienceCard";
import { useNavigate } from "react-router-dom";
export const AllExperienceContainer = ({
  username,
  own,
  experiencesData,
  onExperienceSubmit,
}) => {
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState([]);
  const [openExperienceModal, setOpenExperienceModal] = useState(false);
  useEffect(() => {
    setExperiences(experiencesData);
  }, [experiencesData]);

  return (
    <>
      <div className="bg-body-tertiary w-100">
        <div className="p-4">
          <div className="d-flex justify-content-between mb-2">
            <div className="d-flex ">
              <button
                className="btn p-0 d-flex align-items-center me-2"
                type="button"
                onClick={() => navigate(`/perfil/${username}`)}
              >
                <span className="material-symbols-outlined">
                  arrow_back_ios
                </span>
              </button>
              <span className="fs-5 fw-bold">Experiencias</span>
            </div>
            {own && (
              <div className="d-flex">
                <button
                  type="button"
                  onClick={() => setOpenExperienceModal(true)}
                  className="btn w-100 d-flex p-0 align-items-center"
                >
                  <span className="material-symbols-outlined text-dark-emphasis">
                    add
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
          <ul className="list-group w-100">
            {experiences.length >= 1 ? (
              experiences.map((experience, index) => (
                <React.Fragment key={experience.id}>
                  <ExperienceCard
                    onExperienceSubmit={onExperienceSubmit}
                    username={username}
                    experience={experience}
                    edit={true}
                    own={own}
                  />
                  {index !== experiences.length - 1 && (
                    <hr className="text-body-tertiary" />
                  )}
                </React.Fragment>
              ))
            ) : own ? (
              <li className="list-group-item text-secondary">
                Agrega experiencias a tu perfil.
              </li>
            ) : (
              <li className="list-unstyled d-flex flex-column align-items-center">
                <img
                  width={400}
                  src="/img/404_experiences.png"
                  alt="not found image"
                />
                <span className="fs-5 fw-semibold text-secondary">
                  No se encontraron experiencias
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
      <hr className="m-0" />
    </>
  );
};
