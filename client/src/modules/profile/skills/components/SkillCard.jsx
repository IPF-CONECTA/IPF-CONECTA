import React from "react";

export const SkillCard = ({ skill }) => {
  return (
    <li className="list-unstyled px-2 bg-secondary-subtle rounded-4 me-2 fw-semibold">
      {skill.skill.name}
    </li>
  );
};
