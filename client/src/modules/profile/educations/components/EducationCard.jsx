import { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import { EducationForm } from "./EducationForm";

import { useNoti } from "../../../../hooks/useNoti";

import { getDateMonth } from "../../../../helpers/getTime";
import { disciplinesServices } from "../services/disciplinesServices";

export const EducationCard = ({
  education,
  edit,
  own,
  onEducationSubmit,
  username,
}) => {
  const noti = useNoti();

  const [discipline, setDiscipline] = useState(null);
  const [disciplines, setDisciplines] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [educationToEdit, setEducationToEdit] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEditClick = (education) => {
    setEducationToEdit(education);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchDisciplines = async () => {
      setLoading(true);
      try {
        const res = await disciplinesServices.getDisciplines();
        if (res.status == 200) {
          setDisciplines(res.data);
        } else {
          noti(
            "Ha habido un error al obtener las disciplinas academicas",
            "error"
          );
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching disciplines:", error);
        noti(
          "Ha habido un error al obtener las disciplinas academicas",
          "error"
        );
        setLoading(false);
      }
    };

    fetchDisciplines();
  }, []);

  console.log(education);
  if (loading) return <p>Cargando datos de tarjetas de educación...</p>;

  return (
    <>
      <li key={education.id} className="list-group-flush py-2 d-flex w-100">
        <div className="d-flex flex-column w-100">
          <div className="w-100">
            {edit && own && (
              <div className="d-flex flex-row">
                <button
                  className="btn"
                  onClick={() => handleEditClick(education)}
                >
                  <span className="material-symbols-outlined text-center">
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
                <div className="d-flex">
                  <span className="material-symbols-outlined fs-3">
                    workspace_premium
                  </span>{" "}
                  <h5 className="d-flex fw-semibold">{education.title}</h5>
                </div>

                <div className="d-flex">
                  <span className="material-symbols-outlined fs-3">star</span>
                  <p>
                    <em>{education?.discipline?.name}</em>
                  </p>
                </div>
                <div className="d-flex text-muted">
                  <span className="material-symbols-outlined fs-3">school</span>
                  <p>{education.institution}</p>
                </div>

                <p className="text-muted f-1">
                  {getDateMonth(education.startDate)} -{" "}
                  {getDateMonth(education.endDate)}
                </p>

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
