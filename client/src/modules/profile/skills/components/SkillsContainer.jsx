import React, { useEffect, useState } from "react";
import { SkillCard } from "./SkillCard";
import { AddSkillForm } from "./AddSkillForm";

export const SkillsContainer = ({ skills, own, onSkillSubmit }) => {
  const [openSkillModal, setOpenSkillModal] = useState(false);

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
              <button className="btn d-flex p-0 align-items-center">
                <span className="material-symbols-outlined text-dark-emphasis">
                  edit
                </span>
              </button>
            </div>
          )}
        </div>
        <ul className="d-flex p-0">
          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </ul>
      </div>
    </section>
  );
};
