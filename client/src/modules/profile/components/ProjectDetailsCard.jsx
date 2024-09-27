import { Dialog } from "@mui/material";
import React from "react";

const ProjectDetailsCard = ({
  openProjectDetailsModal,
  setOpenProjectDetailsModal,
}) => {
  return (
    <Dialog
      open={Boolean(openProjectDetailsModal)}
      onClose={() => setOpenProjectDetailsModal(false)}
      fullWidth
      maxWidth="sm"
    >
      <div>detalles del proyecto</div>
    </Dialog>
  );
};

export default ProjectDetailsCard;
