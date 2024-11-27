import React, { useEffect, useState } from "react";
import { getActiveJobs } from "../services/statsServices";

export const ActiveJobs = () => {
  const [activeJobs, setActiveJobs] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getActiveJobs();
        if (res.status !== 200) {
          return setActiveJobs("Hubo un error");
        }
        setActiveJobs(res.data);
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return (
    <div className="d-flex flex-column align-items-center p-2 border rounded-3 ">
      {loading ? (
        "cargando"
      ) : (
        <>
          <span className="fw-semibold fs-4">Trabajos activos</span>
          <span className="fw-bold fs-2">{activeJobs}</span>
        </>
      )}
    </div>
  );
};
