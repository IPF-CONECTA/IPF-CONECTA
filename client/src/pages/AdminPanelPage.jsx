import { AdminPanel, Footer, Nav } from "../components";
import styles from "../../public/css/navPage.module.css";

export const AdminPanelPage = () => {
  return (
    <>
      <Nav />
      <div
        className={`d-flex flex-column mt-5 justify-content-between ${styles.container}`}
      >
        <AdminPanel />
        <Footer />
      </div>
    </>
  );
};
