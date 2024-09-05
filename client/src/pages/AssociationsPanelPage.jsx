import React from "react";
import { Nav, AssociationsPanel } from "../components";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../public/panel.css";

export const AssociationsPanelPage = () => {
  return (
    <>
      <Nav />
      <div className="mt-5">
        <AssociationsPanel />
      </div>
    </>
  );
};
