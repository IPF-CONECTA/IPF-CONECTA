import { Dialog } from "@mui/material";
import React from "react";

export const AddSkillForm = ({ openSkillModal, setOpenSkillModal }) => {
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
        <span className="fw-semibold fs-4">Agregar habilidades</span>
        <form className="shadow-none border-0 mw-100 p-0 mt-2">
          <input
            type="text"
            className="w-100"
            placeholder="Buscar por nombre"
          />
        </form>
      </div>
    </Dialog>
  );
};
