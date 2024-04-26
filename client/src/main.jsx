import React from "react";
import ReactDOM from "react-dom/client";
import "../public/nav.css";
import { Inicio } from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Inicio />
  </React.StrictMode>
);
