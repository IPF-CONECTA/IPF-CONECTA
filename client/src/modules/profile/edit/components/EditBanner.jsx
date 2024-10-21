import React from "react";
import { BASE_URL } from "../../../../constants/BASE_URL";
import styles from "../../../../../public/css/editProfile.module.css";

export const EditBanner = ({ profileData, setProfileData }) => {
  return (
    <>
      <form
        className={`${styles.pfpContainer} rounded-3 d-flex gap-2 bg-secondary-subtle w-75 p-2 mb-5`}
        style={{ maxWidth: "none" }}
      >
        <img
          src={`/img/banner.jpg`}
          alt="hola"
          className="rounded-3 border border-black w-100"
        />
        <div className="d-flex position-absolute m-1" style={{}}>
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
          />
          <button
            type="button"
            className="btn btn-danger p-1 border border-black d-flex rounded-circle align-items-center h-25 justify-content-center"
          >
            <span className="material-symbols-outlined fw-light">delete</span>
          </button>
        </div>
      </form>
    </>
  );
};
