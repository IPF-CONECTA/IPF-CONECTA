import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Layout } from "./modules/ui/components";
import { SnackbarProvider } from "notistack";
import { AuthProvider } from "./context/auth/Provider.jsx";
import { ChatProvider } from "./context/chat/Provider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
      <AuthProvider>
        <ChatProvider>
          <Layout>
            <App />
          </Layout>
        </ChatProvider>
      </AuthProvider>
    </SnackbarProvider>
  </React.StrictMode>
);
