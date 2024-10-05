import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../../constants/BASE_URL";
import styles from "../../../../../public/css/experiencesContainer.module.css";
import { getDate, getTimeQuantity } from "../../../../helpers/getTime";
import { Dialog } from "@mui/material";
import { CreateExperienceModal } from "./CreateExperienceModal";

export const ExperienceCard = ({
  experience,
  edit,
  own,
  onExperienceSubmit,
  username,
}) => {
  const [showDescription, setShowDescription] = useState(false);
  const [skills, setSkills] = useState([]);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [experienceToEdit, setExperienceToEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (experience) => {
    console.log(experience);
    setExperienceToEdit(experience);
    setIsModalOpen(true);
  };
  useEffect(() => {
    const skills = experience.experienceSkills.slice(0, 3);
    setSkills(skills);
  }, [experience]);
  return (
    <>
      <li key={experience.id} className="list-unstyled py-2 d-flex w-100">
        <div className="mx-2">
          <img
            crossOrigin="anonymous"
            width={45}
            height={45}
            src={`${BASE_URL}/logoUrl/${experience.company.logoUrl}`}
            alt="companyImage"
          />
        </div>
        <div className="d-flex flex-column w-100">
          <div className="w-100 d-flex justify-content-between">
            <span className="fw-semibold">{experience.title}</span>
            {edit && own && (
              <button
                className="btn d-flex p-0 align-items-center"
                onClick={() => handleEditClick(experience)}
              >
                <span className="material-symbols-outlined text-dark-emphasis">
                  edit
                </span>
              </button>
            )}
          </div>
          {isModalOpen && (
            <CreateExperienceModal
              experience={experienceToEdit}
              openExperienceModal={isModalOpen}
              setOpenExperienceModal={setIsModalOpen}
              onExperienceSubmit={onExperienceSubmit}
              username={username}
            />
          )}
          <span className={`${styles.smallText}`}>
            {experience.company.name}
            {" - "}
            {experience.modality.name}
          </span>
          <span className={`text-secondary ${styles.smallText}`}>
            {getDate(experience.startDate)}
            {" - "}
            {experience.endDate ? getDate(experience.endDate) : "Actualidad"}
            {" · "}
            {getTimeQuantity(experience.startDate, experience.endDate)}
          </span>
          <span className={`text-secondary ${styles.smallText}`}>
            {experience.ubication}
          </span>
          {experience.description && (
            <p className={`${styles.smallText} py-2`}>
              {experience.description.length > 150 ? (
                showDescription ? (
                  experience.description
                ) : (
                  <>
                    {experience.description.slice(0, 150)}
                    <span
                      onClick={() => setShowDescription(true)}
                      className="text-secondary"
                    >
                      ...Ver más
                    </span>
                  </>
                )
              ) : (
                experience.description
              )}
            </p>
          )}

          <div className="d-flex align-items-center">
            <span className="material-symbols-outlined fw-lighter">grade</span>
            <ul className={` ${styles.smallText} fw-semibold p-0`}>
              {skills.map((skill, index) => (
                <li key={skill.skillId} className="d-inline me-2">
                  <span>{skill.skill.name}</span>
                  {index !== skills.length - 1 && ","}
                </li>
              ))}
              {experience.experienceSkills.length > 3 && (
                <li
                  className="d-inline me-2 fw-semibold"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowAllSkills(true)}
                >
                  y {experience.experienceSkills.length - 3} más...
                </li>
              )}
              <Dialog
                open={showAllSkills}
                onClose={() => setShowAllSkills(false)}
                fullWidth
                maxWidth="sm"
              >
                <div className="p-3">
                  <div className="d-flex justify-content-between mb-3">
                    <span className="fw-bold fs-5 ">{experience.title}</span>
                    <button
                      onClick={() => setShowAllSkills(false)}
                      className="btn d-flex p-0 align-items-center"
                    >
                      <span className="material-symbols-outlined text-dark-emphasis">
                        close
                      </span>
                    </button>
                  </div>
                  <ul className="p-0 m-0">
                    {experience.experienceSkills.map((skill, index) => (
                      <React.Fragment key={skill.skillId}>
                        <li key={skill.skillId} className="list-unstyled">
                          {skill.skill.name}
                        </li>
                        {index !== experience.experienceSkills.length - 1 && (
                          <hr className="text-body-tertiary" />
                        )}
                      </React.Fragment>
                    ))}
                  </ul>
                </div>
              </Dialog>
            </ul>
          </div>
        </div>
      </li>
    </>
  );
};
