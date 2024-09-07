import { Nav, Footer, SupportForm } from "../components";
import styles from "../../public/css/navPage.module.css";
export const SupportPage = () => {
  return (
    <div className={styles.pageContainer}>
      <Nav />
      <div className={`d-flex flex-column ${styles.container}`}>
        <SupportForm />
        <Footer />
      </div>
    </div>
  );
};
