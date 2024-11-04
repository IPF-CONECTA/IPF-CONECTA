import { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import { EducationForm } from "./EducationForm";

import { getDateMonth } from "../../../../helpers/getTime";
import { disciplinesServices } from "../services/disciplinesServices";

export const EducationCard = ({
  education,
  edit,
  own,
  onEducationSubmit,
  username,
}) => {
  const [discipline, setDiscipline] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [educationToEdit, setEducationToEdit] = useState(null);

  const handleEditClick = (education) => {
    setEducationToEdit(education);
    setIsModalOpen(true);
  };

  useEffect(() => {
    disciplinesServices
      .getDiscipline(education.disciplineId)
      .then((res) => setDiscipline(res.data));
  }, []);

  console.log({ discipline });
  return (
    <>
      <li key={education.id} className="list-group-flush py-2 d-flex w-100">
        <div className="d-flex flex-column w-100">
          <div className="w-100 d-flex justify-content-between start-0">
            {edit && own && (
              <div className="d-flex">
                <button
                  className="btn d-flex p-0 align-items-center"
                  onClick={() => handleEditClick(education)}
                >
                  <span className="material-symbols-outlined text-dark-emphasis">
                    edit
                  </span>
                </button>
              </div>
            )}
          </div>
          {isModalOpen && (
            <EducationForm
              education={educationToEdit}
              openEducationModal={isModalOpen}
              setOpenEducationModal={setIsModalOpen}
              onEducationSubmit={onEducationSubmit}
              username={username}
            />
          )}
          <div className="d-flex flex-column">
            <div className="d-flex flex-column p-2 ">
              <div className="d-flex flex-column p-2">
                <div className="d-flex ">
                  <span class="material-symbols-outlined fs-1">
                    workspace_premium
                  </span>{" "}
                  <h5 className="d-flex fw-semibold">{education.title}</h5>
                </div>

                <div className="d-flex text-muted">
                  <span class="material-symbols-outlined fs-3">school</span>
                  <p>{education.institution}</p>
                </div>

                <p className="text-muted f-1">
                  {getDateMonth(education.startDate)} -{" "}
                  {getDateMonth(education.endDate)}
                </p>

                <div className="d-flex">
                  <span class="material-symbols-outlined">star</span>
                  <p>{discipline.name}</p>
                </div>

                <div className="d-flex">
                  <p className="text-secondary">{education?.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};
