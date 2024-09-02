import { Nav, Footer, SupportForm } from "../components";
import styles from "../../public/css/navPage.module.css";
export const SupportPage = () => {
  return (
    <>
      <Nav />
      <div
        className={`mt-5 d-flex flex-column justify-content-between ${styles.container}`}
      >
        <SupportForm />
        <Footer />
      </div>
    </>
  );
};
