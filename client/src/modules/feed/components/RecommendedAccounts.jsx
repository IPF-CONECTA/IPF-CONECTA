import { useEffect, useState } from "react";

import { AccountCard } from "./AccountCard";
import { getAccounts } from "../services/feedServices";

import styles from "../../../../public/css/recommendedAccounts.module.css";

export const RecommendedAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState({ message: null, statusCode: null });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true);
      try {
        const res = await getAccounts();
        if (res.status !== 200) {
          setError({ message: res.message, statusCode: res.data });
          return;
        }
        setAccounts(res.data);
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, []);
  return loading ? (
    <aside className={`border rounded p-2 ${styles.recommendedAccounts}`}>
      <header className="d-flex justify-content-center">
        <span className="fs-5 fw-semibold pb-2">Cuentas recomendadas</span>
      </header>
      <div className={`d-flex justify-content-center my-3`}>
        {" "}
        <span
          className={`spinner-border`}
          role={`status`}
          aria-hidden={`true`}
        ></span>{" "}
      </div>
    </aside>
  ) : (
    <aside
      className={`border rounded p-2 ${styles.recommendedAccounts} ${
        accounts.length < 1 && "d-none"
      }`}
    >
      <header className="d-flex justify-content-center">
        <span className="fs-5 fw-semibold pb-2">Cuentas recomendadas</span>
      </header>
      <div className=" d-flex flex-column">
        <div className="d-flex flex-column align-items-center">
          {error.statusCode !== null ? (
            <>
              <span className="fs-5s fw-bold">{error.statusCode}</span>
              <span className="text-muted">{error.message}</span>
            </>
          ) : (
            accounts.map((account, index) => (
              <AccountCard index={index} account={account} key={account.id} />
            ))
          )}
        </div>
      </div>
    </aside>
  );
};
