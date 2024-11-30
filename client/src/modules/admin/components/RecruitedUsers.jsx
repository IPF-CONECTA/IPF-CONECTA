import React, { useEffect, useState } from "react";
import { getRecruitedUsers } from "../services/statsServices";

const RecruitedUsers = () => {
  const [recruitedUsers, setRecruitedUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getRecruitedUsers();
        if (res.status !== 200) {
          return setRecruitedUsers("Hubo un error");
        }
        setRecruitedUsers(res.data);
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className="d-flex flex-column align-items-center p-2 border rounded-3">
      {loading ? (
        "cargando"
      ) : (
        <>
          <span className="fw-semibold fs-4">Egresados conectados</span>
          <span className="fw-bold fs-2">{recruitedUsers}</span>
        </>
      )}
    </div>
  );
};

export default RecruitedUsers;
