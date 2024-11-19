import React, { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import { EducationForm } from "./EducationForm";

import { useNoti } from "../../../../hooks/useNoti";

import { getDateMonth, getYear } from "../../../../helpers/getTime";
import { disciplinesServices } from "../services/disciplinesServices";

import styles from "../../../../../public/css/educationCard.module.css";

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
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [skills, setSkills] = useState([]);

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

  useEffect(() => {
    const skills = education.skills?.slice(0, 3);
    setSkills(skills);
  }, [education]);

  if (loading) return <p>Cargando datos de tarjetas de educación...</p>;

  return (
    <>
      <li key={education.id} className="list-group-item py-3 px-0">
        <div className="d-flex justify-content-between align-items-start">
          <div className="mx-2">
            <span className="material-symbols-outlined" style={{ color: "" }}>
              school
            </span>
            <img
              src="/img/education_generic_image.png"
              alt="Educación"
              width={45}
              className="border pe-none"
            />
          </div>
          <div className={`flex-grow-1 ${styles.smallText}`}>
            <p className="fw-semibold mb-1 d-flex align-items-center">
              {education.title}
            </p>
            <p className="text-muted">
              {getYear(education.startDate)} - {getYear(education.endDate)}
            </p>
            <div className="text-muted">{education.institute.name}</div>
            <div className="text-muted">
              <em>{education?.discipline?.name}</em>
            </div>
            <p>{education?.description}</p>
            <ul className="p-0 m-0 d-flex align-items-center flex-row">
              <span className="material-symbols-outlined fw-lighter me-2">
                grade
              </span>
              <ul className={` ${styles.smallText} fw-semibold p-0`}>
                {skills.map((skill, index) => (
                  <li key={skill.id} className="d-inline me-2">
                    <span>{skill.name}</span>
                    {index !== education.skills.length - 1 && ","}
                  </li>
                ))}
                {education.skills.length > 3 && (
                  <li
                    className="d-inline me-2 fw-semibold"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowAllSkills(true)}
                  >
                    y {education.skills.length - 3} más...
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
                      <span className="fw-bold fs-5 ">{education.title}</span>
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
                      {education.skills.map((skill, index) => (
                        <React.Fragment key={skill.id}>
                          <li key={skill.id} className="list-unstyled">
                            {skill.name}
                          </li>
                          {index !== education.skills.length - 1 && (
                            <hr className="text-body-tertiary" />
                          )}
                        </React.Fragment>
                      ))}
                    </ul>
                  </div>
                </Dialog>
              </ul>
            </ul>
          </div>

          {edit && own && (
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => handleEditClick(education)}
            >
              <span className="material-symbols-outlined fs-5">edit</span>
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
      </li>
    </>
  );
};
