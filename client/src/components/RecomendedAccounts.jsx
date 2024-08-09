import React, { useEffect } from "react";
import styles from "../../public/css/recomendedAccounts.module.css";
const RecomendedAccounts = ({ accounts }) => {
  useEffect(() => {
    console.log("ACCOUNTS STATE");
    console.log(accounts);
  }, [accounts]);

  return (
    <aside
      className={`w-25 border rounded py-5 ${styles.container} position-fixed end-0`}
    >
      <div className=" d-flex flex-column">
        <header className="d-flex justify-content-center">
          <span className="fs-3 fw-bold pb-2">Cuentas recomendadas</span>
        </header>
        <div className="d-flex flex-column align-items-center">
          {accounts.map((account) => (
            <div
              className="avatar w-75 d-flex justify-content-between align-items-center p-2 mb-2 border rounded"
              key={account.id}
            >
              <div className="d-flex">
                <img
                  width={50}
                  height={50}
                  className="rounded-circle me-2"
                  src={account.profilePic}
                  alt={account.names}
                />
                <div className=" d-flex flex-column">
                  <span className="fs-5">
                    {account.names + " " + account.surnames}
                  </span>
                  {account.title ? (
                    <span className="text-muted">{account.title}</span>
                  ) : (
                    <span className="text-muted">Sin titulo</span>
                  )}
                </div>
              </div>
              <button className="btn btn-dark h-25">Seguir</button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default RecomendedAccounts;
