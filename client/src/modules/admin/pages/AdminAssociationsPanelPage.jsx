import "bootstrap/dist/css/bootstrap.min.css";

import { Nav, Footer } from "../../ui/components";
import { AssociationsPanel } from "../components/AdminAssociationsPanel";

import "../../../../public/panel.css";

export const AssociationsPanelPage = () => {
  return (
    <>
      <Nav />
      <AssociationsPanel />
      <Footer />
    </>
  );
};
