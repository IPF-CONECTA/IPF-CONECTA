import React, { useState } from "react";
import styles from "../../../../../public/css/editProfile.module.css";
import axios from "axios";
import { useNoti } from "../../../../hooks/useNoti";
import { authService } from "../../../auth/services/authService";
import { BASE_URL } from "../../../../constants/BASE_URL";
import { changePfp } from "../services/pfpServices";

export const EditPfp = ({ profileData, setProfileData }) => {
  const noti = useNoti();
  const [profilePicPreview, setProfilePicPreview] = useState([
    profileData?.profile?.profilePic,
    false,
  ]);
  const [file, setFile] = useState(null);

  const onPfpChange = async (e) => {
    setFile(e.target.files[0]);
    setProfilePicPreview([URL.createObjectURL(e.target.files[0]), true]);
  };
  const onCancel = () => {
    setProfilePicPreview([profileData?.profile?.profilePic, false]);
  };
  const onSave = async (e) => {
    e.preventDefault();
    if (!file)
      return noti(
        "Elija una imagen para actualizar su foto de perfil",
        "warning"
      );
    const res = await changePfp(file);
    if (res.status !== 201)
      return noti("Hubo un error al actualizar tu foto de perfil", "warning");
    setProfileData({ ...profileData, profile: res.data });
    noti("Foto actualizada", "success");
  };

  return (
    <form
      className={`d-flex flex-column align-items-center bg-body-tertiary shadow rounded me-4 p-3 ${styles.pfpContainer}`}
      onSubmit={(e) => onSave(e)}
    >
      <span className="fs-4 fw-semibold mb-2">Foto de perfil</span>
      <div>
        <img
          width={188}
          height={188}
          src={
            profilePicPreview[1]
              ? profilePicPreview[0]
              : `${BASE_URL}/images/${profileData?.profile?.profilePic}`
          }
          alt="tu foto de perfil"
          className={`rounded-circle mb-3 ${styles.pfp}`}
        />
        <div className="d-flex flex-column justify-content-center ">
          <label
            htmlFor="pfpInput"
            className={`${styles.pfpLabel}  p-1 btn btn-outline-dark d-flex align-items-center justify-content-center mb-2`}
          >
            <span className="material-symbols-outlined ">add_a_photo</span>
          </label>
          <input
            name="images"
            id="pfpInput"
            className={`position-absolute opacity-0 ${styles.pfpInput}`}
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={onPfpChange}
          />
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-danger p-1 d-flex align-items-center w-100 justify-content-center"
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>
      {profilePicPreview[1] && (
        <button type="submit" className="btn btn-outline-dark mt-2">
          Guardar
        </button>
      )}
    </form>
  );
};
