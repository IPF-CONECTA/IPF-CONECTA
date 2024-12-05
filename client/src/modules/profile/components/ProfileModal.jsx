import { Dialog } from "ckeditor5";
import React from "react";

export const ProfileModal = (open, setOpen, username) => {
  return (
    <Dialog maxWidth="md" open={open} onClose={() => setOpen(false)}>
      <Profile data={username} />
    </Dialog>
  );
};
