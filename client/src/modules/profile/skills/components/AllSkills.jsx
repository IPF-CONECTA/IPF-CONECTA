import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddSkillForm } from "./AddSkillForm";
import { deleteSkill } from "../services";
import { useNoti } from "../../../../hooks/useNoti";
import Dialog from "@mui/material/Dialog";
export const AllSkills = ({ own, skillsData, onSkillSubmit, username }) => {
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
    const res = await deleteSkill(selectedSkill.skillId);
    if (res.status !== 200) return noti(res.message, "error");
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
            className="btn p-0 d-flex align-items-center me-2"
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
              className="btn p-0 me-2 d-flex align-items-center"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
            <AddSkillForm
              openSkillModal={openSkillFormModal}
              setOpenSkillModal={setOpenSkillFormModal}
              onSkillsSubmit={onSkillSubmit}
            />
          </>
        )}
      </div>
      <ul className="p-0 m-0 list-unstyled">
        {skills && skills.length >= 1 ? (
          skills.map((skill) => (
            <li key={skill.skillId}>
              <div className="d-flex justify-content-between p-2">
                <span>{skill.skill.name}</span>
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
                      <span className="material-symbols-outlined fw-light">
                        do_not_disturb_on
                      </span>
                    </button>
                  </div>
                )}
              </div>
              <hr className="m-0 p-0" />
            </li>
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
            <span className="fw-semibold"> {selectedSkill?.skill.name}</span> de
            tu perfil?
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
