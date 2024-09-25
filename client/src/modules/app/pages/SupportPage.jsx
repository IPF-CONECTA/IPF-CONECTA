import { Nav, Footer } from "../../ui/components";
import { SupportForm } from "../components/SupportForm";

export const SupportPage = () => {
  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
        }}
      >
        <Nav />
        <SupportForm />
        <Footer />
      </div>
    </>
  );
};
