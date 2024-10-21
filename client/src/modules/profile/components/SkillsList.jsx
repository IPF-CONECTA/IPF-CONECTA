import { Dialog } from "@mui/material";
import React, { useState } from "react";
export const SkillsList = ({ skillsData, name, type }) => {
  const [skills, setSkills] = useState(skillsData?.slice(0, 3));
  const [showAllSkills, setShowAllSkills] = useState(false);
  return (
    <div className="d-flex align-items-center">
      <span className="material-symbols-outlined fw-lighter">grade</span>
      <ul style={{ fontSize: "0.8rem" }} className={`fw-semibold p-0 m-0`}>
        {skills?.map((skill, index) => (
          <li key={skill.skillId} className="d-inline me-2">
            <span>{skill.skill.name}</span>
            {index !== skills.length - 1 && ","}
          </li>
        ))}
        {skillsData?.length > 3 && (
          <li
            className="d-inline me-2 fw-semibold"
            style={{ cursor: "pointer" }}
            onClick={() => setShowAllSkills(true)}
          >
            y {skillsData?.length - 3} más...
          </li>
        )}
        <Dialog
          open={showAllSkills}
          onClose={() => setShowAllSkills(false)}
          fullWidth
          maxWidth="xs"
        >
          <div className="p-3">
            <div className="d-flex justify-content-between mb-3">
              <span className="fw-bold fs-5 ">
                {type} {name}
              </span>
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
              {skillsData.map((skill, index) => (
                <React.Fragment key={skill.skillId}>
                  <li key={skill.skillId} className="list-unstyled">
                    {skill.skill.name}
                  </li>
                  {index !== skillsData.length - 1 && (
                    <hr className="text-body-tertiary" />
                  )}
                </React.Fragment>
              ))}
            </ul>
          </div>
        </Dialog>
      </ul>
    </div>
  );
};
