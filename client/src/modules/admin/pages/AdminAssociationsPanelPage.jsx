import "bootstrap/dist/css/bootstrap.min.css";

import { Nav, Footer } from "../../ui/components";
import { AdminAssociationsPanel } from "../components/AdminAssociationsPanel";

import "../../../../public/panel.css";

export const AdminAssociationsPanelPage = () => {
  return (
    <>
      <Nav />
      <AdminAssociationsPanel />
      <Footer />
    </>
  );
};
