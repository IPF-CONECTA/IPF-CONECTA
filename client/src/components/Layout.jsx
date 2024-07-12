import React from "react";
import "../../public/layout.css";

export const Layout = ({ children }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        minHeight: "100vh",
      }}
      className="layout-container"
    >
      {children}
    </div>
  );
};
