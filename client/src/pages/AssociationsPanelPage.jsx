import React from "react";
import { Nav, AssociationsPanel, Footer } from "../components";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../public/panel.css";

export const AssociationsPanelPage = () => {
  return (
    <>
      <Nav />
      <AssociationsPanel />
      <Footer />
    </>
  );
};
