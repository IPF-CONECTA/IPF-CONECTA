import { Nav, Footer, SupportForm } from "../components";
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
