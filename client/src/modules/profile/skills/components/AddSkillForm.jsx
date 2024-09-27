import { Dialog } from "@mui/material";
import React, { useState } from "react";
import { SkillSearch } from "./FindSkills";
import axios from "axios";
import { authService } from "../../../auth/services/authService";
import styles from "../../../../../public/css/addSkillForm.module.css";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedSkills);
    try {
      await Promise.all(
        selectedSkills.map((skillId) =>
          axios.post(
            `http://localhost:4000/skillProfile/${skillId}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${authService.getToken()}`,
              },
            }
          )
        )
      );
      setOpenSkillModal(false);
      onSkillsSubmit();
    } catch (error) {
      console.error("Error adding skills:", error);
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
          className={`shadow-none border-0 mw-100 p-0 mt-2 d-flex flex-column align-items-end justify-content-between ${styles.formSkillModal}`}
          onSubmit={handleSubmit}
        >
          <SkillSearch onSkillSelect={handleSkillSelect} />

          <button type="submit" className="btn btn-primary mt-3">
            Agregar
          </button>
        </form>
      </div>
    </Dialog>
  );
};
