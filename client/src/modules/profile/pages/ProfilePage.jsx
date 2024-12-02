import React from "react";
import { Nav } from "../../ui/components";
import { Profile } from "../components/Profile";
import { RecommendedAccounts } from "../../feed/components/RecommendedAccounts";
import styles from "../../../../public/css/profile.module.css";
import { SideBar } from "../../ui/components/SideBar";

export const ProfilePage = () => {
  return (
    <div>
      <SideBar />
      <div
        className={`d-flex justify-content-around px-5 pt-4 ms-5 ${styles.mainContainer}`}
      >
        <div
          className={`profile d-flex flex-column align-items-center mb-4 ${styles.profileContainer}`}
        >
          <Profile />
        </div>
        <RecommendedAccounts />
      </div>
    </div>
  );
};
