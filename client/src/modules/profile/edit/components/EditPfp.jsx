import React, { useContext, useState } from "react";
import styles from "../../../../../public/css/editProfile.module.css";
import { useNoti } from "../../../../hooks/useNoti";
import { BASE_URL } from "../../../../constants/BASE_URL";
import { changePfp } from "../services/editProfileServices";
import { authContext } from "../../../../context/auth/Context";

export const EditPfp = ({ profileData, setProfileData }) => {
  const noti = useNoti();
  const [profilePicPreview, setProfilePicPreview] = useState([
    profileData?.profile?.profilePic,
    false,
  ]);
  const { updateProfilePic } = useContext(authContext);
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
    setProfilePicPreview([res.data, false]);
    setProfileData({
      ...profileData,
      profile: { ...profileData.profile, profilePic: res.data },
    });
    updateProfilePic(res.data);
    noti("Foto actualizada", "success");
  };
  return (
    <form
      className={`d-flex flex-column bg-transparent align-items-center border-0 shadow-none rounded-0 p-0 ${styles.pfpContainer}`}
      onSubmit={(e) => onSave(e)}
    >
      <div>
        <div className="d-flex justify-content-center position-absolute">
          <label
            htmlFor="pfpInput"
            className={`${styles.pfpLabel} bg-white rounded-circle  p-1 btn btn-outline-white border-black d-flex align-items-center justify-content-center h-25 me-1`}
          >
            <span className="material-symbols-outlined fw-light">
              add_a_photo
            </span>
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
            className="btn btn-danger p-1 border border-black d-flex rounded-circle align-items-center h-25 justify-content-center"
          >
            <span className="material-symbols-outlined fw-light">delete</span>
          </button>
          {profilePicPreview[1] && (
            <button
              type="submit"
              className="ms-1 btn btn-success p-1 border border-black d-flex rounded-circle align-items-center h-25 justify-content-center"
            >
              <span className="material-symbols-outlined">check</span>
            </button>
          )}
        </div>
        <img
          height={166}
          width={166}
          src={
            profilePicPreview[1]
              ? profilePicPreview[0]
              : `${BASE_URL}/images/${profileData?.profile?.profilePic}`
          }
          alt="tu foto de perfil"
          className={`rounded-circle bg-white border border-dark `}
          style={{ objectFit: "cover" }}
        />
      </div>
    </form>
  );
};
