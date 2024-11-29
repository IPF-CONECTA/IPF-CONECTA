import "bootstrap/dist/css/bootstrap.min.css";

import { SideBar } from "../../ui/components";
import { AdminAssociationsPanel } from "../components/AdminAssociationsPanel";

import "../../../../public/panel.css";

export const AdminAssociationsPanelPage = () => {
  return (
    <>
      <SideBar />
      <AdminAssociationsPanel />
    </>
  );
};
