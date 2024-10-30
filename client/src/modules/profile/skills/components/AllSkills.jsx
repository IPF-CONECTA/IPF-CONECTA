import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddSkillForm } from "./AddSkillForm";
import { deleteSkill } from "../services";
import { useNoti } from "../../../../hooks/useNoti";
import Dialog from "@mui/material/Dialog";
import { SkillCard } from "./SkillCard";
export const AllSkills = ({ own, skillsData, onSkillSubmit, username }) => {
  console.log(skillsData);
  const [skills, setSkills] = useState([]);
  const [openSkillFormModal, setOpenSkillFormModal] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const noti = useNoti();
  const navigate = useNavigate();
  useEffect(() => {
    setSkills(skillsData);
  }, [skillsData]);

  const confirmDelete = async () => {
    if (!selectedSkill) {
      return;
    }
    console.log(selectedSkill);
    Promise.all(
      selectedSkill[1].map((ass) => {
        console.log(ass);
        return deleteSkill(ass.id, selectedSkill[2]);
      })
    );
    noti("Habilidad eliminada", "success");
    onSkillSubmit();
    setOpenConfirmDelete(false);
    setSelectedSkill(null);
  };
  return (
    <section>
      <div className="d-flex justify-content-between mb-2">
        <div className="d-flex ">
          <button
            className="btn p-0 d-flex align-items-center "
            type="button"
            onClick={() => navigate(`/perfil/${username}`)}
          >
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </button>
          <span className="fs-5 fw-bold">Habilidades</span>
        </div>
        {own && (
          <>
            <button
              type="button"
              onClick={() => setOpenSkillFormModal(true)}
              className="btn p-0 me-3 d-flex align-items-center"
            >
              <span className="material-symbols-outlined text-secondary">
                add
              </span>
            </button>
            <AddSkillForm
              openSkillModal={openSkillFormModal}
              setOpenSkillModal={setOpenSkillFormModal}
              onSkillsSubmit={onSkillSubmit}
            />
          </>
        )}
      </div>
      <ul className="p-0 m-0 mx-4 list-unstyled border border-bottom-0 rounded">
        {skills && skills.length >= 1 ? (
          skills.map((skill, index) => (
            <SkillCard
              edit={true}
              own={own}
              setOpenConfirmDelete={setOpenConfirmDelete}
              setSelectedSkill={setSelectedSkill}
              skill={skill}
              key={index}
            />
          ))
        ) : own ? (
          <li className="list-group-item text-secondary">
            Agrega habilidades a tu perfil.
          </li>
        ) : (
          <li className="list-group-item text-secondary">
            Este perfil no tiene habilidades agregadas
          </li>
        )}
      </ul>
      <Dialog
        open={openConfirmDelete}
        onClose={() => setOpenConfirmDelete(false)}
        maxWidth={"xs"}
      >
        <div className="p-3">
          <span className="fs-3 fw-semibold">Confirmar eliminación</span>
          <p className="mb-3">
            ¿Estás seguro de que deseas eliminar
            <span className="fw-semibold"> {selectedSkill?.[0]}</span> de tu
            perfil?
          </p>
          <div className="w-100 d-flex justify-content-end">
            <button
              className="btn btn-outline-warning me-2 fw-semibold"
              onClick={() => setOpenConfirmDelete(false)}
            >
              Cancelar
            </button>
            <button
              className="btn btn-outline-danger fw-semibold"
              onClick={confirmDelete}
            >
              Confirmar
            </button>
          </div>
        </div>
      </Dialog>
    </section>
  );
};
