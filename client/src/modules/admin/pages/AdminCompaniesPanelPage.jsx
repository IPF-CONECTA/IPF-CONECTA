import { Nav, Footer, SideBar } from "../../ui/components";
import { AdminCompaniesPanel } from "../components/AdminCompaniesPanel";

import styles from "../../../../public/css/navPage.module.css";

export const AdminCompaniesPanelPage = () => {
  return (
    <>
      <SideBar />
      <AdminCompaniesPanel />
    </>
  );
};
