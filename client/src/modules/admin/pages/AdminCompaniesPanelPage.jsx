import { Nav, Footer } from "../../ui/components";
import { AdminCompaniesPanel } from "../components/AdminCompaniesPanel";

import styles from "../../public/css/navPage.module.css";

export const AdminCompaniesPanelPage = () => {
  return (
    <>
      <Nav />
      <div
        className={`d-flex flex-column mt-5 justify-content-between ${styles.container}`}
      >
        <AdminCompaniesPanel />
        <Footer />
      </div>
    </>
  );
};
