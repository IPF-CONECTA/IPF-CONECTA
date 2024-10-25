import React from "react";
import { BASE_URL } from "../../../../constants/BASE_URL";

export const SkillCard = ({
  skill,
  own,
  setSelectedSkill,
  setOpenConfirmDelete,
}) => {
  const renderSkillType = (data) => {
    return data.map((item, index) => {
      switch (item.type) {
        case "experience":
          return (
            <div className="d-flex align-items-center mt-2" key={index}>
              <img
                crossOrigin="anonymous"
                height={40}
                src={`${BASE_URL}/logoUrl/${item.data.company.logoUrl}`}
                alt="Logo"
                className="border p-1 rounded me-2"
              />
              <span>
                {item.data.title} en{" "}
                <span className="fw-semibold">{item.data.company.name}</span>
              </span>
            </div>
          );
        case "education":
          return <div key={index}>Asociado a {item.id}</div>;
        case "certification":
          return <div key={index}>Asociado a {item.id}</div>;
        case "project":
          return (
            <div key={index} className="mt-2">
              Asociado al proyecto{" "}
              <span className="fw-semibold">{item.data.name}</span>
            </div>
          );
        default:
          return null;
      }
    });
  };
  return (
    <li className="list-unstyled p-3 fw-semibold border-bottom d-flex justify-content-between">
      <div>
        <span className="fs-6">{skill[0]}</span>
        <span
          className="text-secondary fw-normal"
          style={{ fontSize: "0.85rem" }}
        >
          <div className="ms-3">{renderSkillType(skill[1])}</div>
        </span>
      </div>
      {own && (
        <div>
          <button
            onClick={() => {
              setSelectedSkill(skill);
              setOpenConfirmDelete(true);
            }}
            type="button"
            className="btn p-0 d-flex align-items-center"
          >
            <span className="material-symbols-outlined fw-light text-secondary">
              do_not_disturb_on
            </span>
          </button>
        </div>
      )}
    </li>
  );
};
