import { useEffect, useState } from "react";

import { AccountCard } from "./AccountCard";
import { getAccounts } from "../services/feedServices";

import styles from "../../../../public/css/recomendedAccounts.module.css";

export const RecomendedAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState({ message: null, statusCode: null });
  useEffect(() => {
    const fetchAccounts = async () => {
      const { data, statusCode, message } = await getAccounts();
      if (statusCode !== 200) {
        setError({ message, statusCode });
        return;
      }
      setAccounts(data);
    };
    fetchAccounts();
  }, []);
  return (
    <aside className={`border rounded p-2 ${styles.container}`}>
      <div className=" d-flex flex-column">
        <header className="d-flex justify-content-center">
          <span className="fs-5 fw-semibold pb-2">Cuentas recomendadas</span>
        </header>
        <div className="d-flex flex-column align-items-center">
          {error.statusCode !== null ? (
            <>
              <span className="fs-5s fw-bold">{error.statusCode}</span>
              <span className="text-muted">{error.message}</span>
            </>
          ) : (
            accounts.map((account) => (
              <AccountCard account={account} key={account.id} />
            ))
          )}
        </div>
      </div>
    </aside>
  );
};
