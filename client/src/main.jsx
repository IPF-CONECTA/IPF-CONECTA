import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Layout } from "./components/Layout.jsx";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
      <Layout>
        <App />
      </Layout>
    </SnackbarProvider>
  </React.StrictMode>
);
