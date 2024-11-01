import React, { useContext, useEffect, useState } from "react";
import { Nav } from "../../../ui/components";
import { PersonalDetails } from "./PersonalDetails";
import { getProfile } from "../../../feed/services/feedServices";
import { useParams } from "react-router-dom";
import { EditPfp } from "./EditPfp";
import { useNoti } from "../../../../hooks/useNoti";
import { authContext } from "../../../../context/auth/Context";
import { Dialog } from "@mui/material";
import { EditBanner } from "./EditBanner";

export const EditProfileModal = ({
  openModal,
  setOpenModal,
  profileData,
  setProfileData,
}) => {
  return (
    <>
      <Dialog
        open={Boolean(openModal)}
        onClose={() => setOpenModal(false)}
        fullWidth
        maxWidth="md"
      >
        <div className="d-flex flex-column justify-content-center">
          <div className="d-flex justify-content-evenly px-3 py-3">
            <EditPfp
              profileData={profileData}
              setProfileData={setProfileData}
            />
            <EditBanner
              profileData={profileData}
              setProfileData={setProfileData}
            />
          </div>
          <PersonalDetails
            profileData={profileData}
            setProfileData={setProfileData}
          />
        </div>
      </Dialog>
    </>
  );
};
