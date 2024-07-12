import { AdminPanel } from "../pages/AdminCompany";
import { Nav } from "../pages/Nav";
import { Footer } from "../pages/Footer";

export const AdminCompany = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        minHeight: "100vh",
      }}
    >
      <Nav />
      <AdminPanel />
      <Footer />
    </div>
  );
};
