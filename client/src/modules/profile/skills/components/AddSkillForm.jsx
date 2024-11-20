import { Dialog } from "@mui/material";
import React, { useState } from "react";
import { SkillSearch } from "./FindSkills";
import axios from "axios";
import { authService } from "../../../auth/services/authService";
import styles from "../../../../../public/css/addSkillForm.module.css";
import { useNoti } from "../../../../hooks/useNoti";
import { BASE_URL } from "../../../../constants/BASE_URL";
export const AddSkillForm = ({
  openSkillModal,
  setOpenSkillModal,
  onSkillsSubmit,
}) => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const handleSkillSelect = (selectedOption) => {
    const skills = Array.isArray(selectedOption)
      ? selectedOption
      : [selectedOption];
    setSelectedSkills(skills.map((skill) => skill.value));
  };
  const noti = useNoti();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Promise.all(
        selectedSkills.map((skillId) =>
          axios.post(
            `${BASE_URL}/skillProfile/${skillId}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${authService.getToken()}`,
              },
            }
          )
        )
      );

      if (selectedSkills.length > 1) {
        noti("Habilidades agregadas exitosamente", "success");
      } else {
        noti("Habilidad agregada exitosamente", "success");
      }
      setOpenSkillModal(false);
      onSkillsSubmit();
    } catch (error) {
      console.error("Hubo un error al agregar la/s skills:", error);
    }
  };

  return (
    <Dialog
      open={Boolean(openSkillModal)}
      onClose={() => {
        setOpenSkillModal(null);
      }}
      fullWidth
      maxWidth="sm"
    >
      <div className="p-3">
        <span className="fw-semibold fs-4">Agregar habilidad</span>
        <form
          className={`shadow-none border-0 mw-100 p-0 mt-2 d-flex flex-column justify-content-between ${styles.formSkillModal}`}
          onSubmit={handleSubmit}
        >
          <SkillSearch onSkillSelect={handleSkillSelect} />
          <span className="text-secondary">
            Otras personas podrán ver tus habilidades y saber más de tí.
          </span>
          <div className="d-flex justify-content-end w-100">
            <button type="submit" className="btn btn-dark mt-3">
              Agregar
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};
