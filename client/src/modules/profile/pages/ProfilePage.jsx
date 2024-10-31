import React from "react";
import { Nav } from "../../ui/components";
import { Profile } from "../components/Profile";
import { RecommendedAccounts } from "../../feed/components/RecommendedAccounts";
import styles from "../../../../public/css/profile.module.css";
export const ProfilePage = () => {
  return (
    <>
      <Nav />
      <div
        className={`w-100 d-flex justify-content-evenly px-5 pt-4 ${styles.mainContainer}`}
      >
        <div
          className={`profile d-flex flex-column align-items-center border border-bottom-0 rounded-top-4 mb-4 ${styles.profileContainer}`}
        >
          <Profile />
        </div>
        <RecommendedAccounts />
      </div>
    </>
  );
};
