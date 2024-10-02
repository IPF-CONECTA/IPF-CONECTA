import React, { useEffect, useState } from "react";
import { SkillCard } from "./SkillCard";
import { AddSkillForm } from "./AddSkillForm";
import { useNavigate } from "react-router-dom";

export const SkillsContainer = ({ skillsData, own, onSkillSubmit }) => {
  const [skills, setSkills] = useState([]);
  const [openSkillModal, setOpenSkillModal] = useState(false);
  const displayedSkills = skills?.slice(0, 2);
  const navigate = useNavigate();
  useEffect(() => {
    setSkills(skillsData);
  }, [skillsData]);
  return (
    <section className="bg-body-tertiary">
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-between mb-2">
          <span className="fs-5 fw-bold">Habilidades</span>
          {own && (
            <div className="d-flex">
              <button
                onClick={() => setOpenSkillModal(true)}
                className="btn d-flex p-0 align-items-center me-3 "
              >
                <span className="material-symbols-outlined text-dark-emphasis">
                  add
                </span>
              </button>

              <AddSkillForm
                openSkillModal={openSkillModal}
                setOpenSkillModal={setOpenSkillModal}
                onSkillsSubmit={onSkillSubmit}
              />
              <button
                className="btn d-flex p-0 align-items-center"
                onClick={() => navigate("habilidades")}
              >
                <span className="material-symbols-outlined text-dark-emphasis">
                  edit
                </span>
              </button>
            </div>
          )}
        </div>
        {skills && skills.length >= 1 ? (
          <>
            <ul className="p-0 m-0 border border-bottom-0 border-end-0 border-start-0">
              {displayedSkills.map((skill) => (
                <SkillCard key={skill.skillId} skill={skill} />
              ))}
            </ul>
            {skills.length > 2 && !own && (
              <div className="d-flex justify-content-center">
                <button
                  onClick={() => navigate(`habilidades`)}
                  className="btn btn-outline-dark mt-3"
                >
                  Mostrar más
                </button>
              </div>
            )}
          </>
        ) : (
          <ul className="p-0 m-0 list-group ">
            <li className="list-group-item text-secondary">
              Agrega habilidades a tu perfil.
            </li>
          </ul>
        )}
      </div>
    </section>
  );
};
