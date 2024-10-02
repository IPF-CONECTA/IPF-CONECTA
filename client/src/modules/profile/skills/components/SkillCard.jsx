import React from "react";

export const SkillCard = ({ skill }) => {
  return (
    <li className="list-unstyled p-2 border border-top-0 fw-semibold">
      {skill.skill.name}
    </li>
  );
};
