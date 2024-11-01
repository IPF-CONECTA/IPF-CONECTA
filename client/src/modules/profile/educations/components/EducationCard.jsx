import { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import { EducationForm } from "./EducationForm";

export const EducationCard = ({
  education,
  edit,
  own,
  onEducationSubmit,
  username,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [educationToEdit, setEducationToEdit] = useState(null);

  const handleEditClick = (education) => {
    setEducationToEdit(education);
    setIsModalOpen(true);
  };

  return (
    <>
      <li key={education.id} className="list-unstyled py-2 d-flex w-100">
        <div className="d-flex flex-column w-100">
          <div className="w-100 d-flex justify-content-between">
            <span className="fw-semibold">{education.title}</span>
            {edit && own && (
              <button
                className="btn d-flex p-0 align-items-center"
                onClick={() => handleEditClick(education)}
              >
                <span className="material-symbols-outlined text-dark-emphasis">
                  edit
                </span>
              </button>
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
          <p className="text-secondary">{education?.description}</p>
        </div>
      </li>
    </>
  );
};
