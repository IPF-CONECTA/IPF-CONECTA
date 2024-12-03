import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../../../../public/css/dashboard.module.css";
import { BASE_URL } from "../../../constants/BASE_URL";
import { Stats } from "./Stats";
import { ReportsContainer } from "./Reports";

export const AdminDashboard = () => {
  const [associations, setAssociations] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [activeTab, setActiveTab] = useState("admin");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAssociations = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/admin/get-associations/Pendiente`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setAssociations(response.data.associations || []);
      } catch (error) {
        console.error("Error fetching associations:", error);
      }
    };

    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/admin/get-companies/Aprobada`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCompanies(response.data.companies || []);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchAssociations();
    fetchCompanies();
  }, []);

  return (
    <main className={`${styles.mainContainer}`}>
      <nav className={`${styles.nav} rounded my-4 overflow-hidden`}>
        <button
          onClick={() => setActiveTab("admin")}
          className={`${
            activeTab == "admin" && styles.activeTab + " shadow-sm"
          } ${styles.tab} btn rounded `}
          style={{ marginRight: "0.3rem" }}
          type="button"
        >
          Administrar
        </button>
        <button
          onClick={() => setActiveTab("dash")}
          className={`${activeTab == "dash" && styles.activeTab + " shadow"} ${
            styles.tab
          } btn rounded `}
          type="button"
        >
          Dashboard
        </button>
      </nav>
      <div>
        {activeTab == "admin" ? (
          <div className="d-flex gap-4">
            <div className="w-50">
              <div className="border rounded-3 p-3 mb-3">
                <span className="fw-bold fs-3 ">
                  Asociaciones ({associations.length})
                </span>
                <div className="d-flex flex-column gap-2 mt-2">
                  {associations.slice(0, 3).map((assoc) => (
                    <div
                      key={assoc.id}
                      className="d-flex justify-content-between p-2 border rounded-3"
                    >
                      <div className="d-flex align-items-center">
                        <img
                          width={40}
                          height={40}
                          className="rounded-circle me-2"
                          src={`${BASE_URL}/images/${assoc.profile.profilePic}`}
                          alt="Profile"
                        />
                        <div className="d-flex flex-column">
                          <span className="fw-semibold">
                            {assoc.profile.user.username}
                          </span>
                          <span className="text-secondary">
                            {assoc.profile.user.email}
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <p>{assoc.company.name}</p>
                        <img
                          width={40}
                          height={40}
                          className="rounded-circle ms-2"
                          src={`${BASE_URL}/logoUrl/${assoc.company.logoUrl}`}
                          alt="Company Logo"
                        />
                      </div>
                    </div>
                  ))}
                  {associations.length === 0 && (
                    <p>No hay asociaciones disponibles.</p>
                  )}
                </div>
                <div className="mt-3 d-flex justify-content-end">
                  <button
                    style={{ width: "210px" }}
                    className="btn btn-dark fw-semibold"
                    onClick={() => navigate("/admin/asociaciones")}
                  >
                    Administrar Asociaciones
                  </button>
                </div>
              </div>
              <div className="border rounded-3 p-3">
                <span className="fw-bold fs-3">
                  Empresas ({companies.length})
                </span>
                <div className="row  row-cols-xxl-3 row-cols-md-2 row-cols-sm-1 px-2 mt-2">
                  {companies.slice(0, 8).map((company) => (
                    <div key={company.id} className="p-1">
                      <div className="col p-2 border rounded-3">
                        <img
                          width={40}
                          height={40}
                          className="rounded-circle me-2"
                          src={`${BASE_URL}/logoUrl/${company.logoUrl}`}
                          alt="Company Logo"
                        />
                        <span className="fw-semibold">
                          {company.name.length > 10
                            ? company.name.slice(0, 10) + "..."
                            : company.name}
                        </span>
                      </div>
                    </div>
                  ))}
                  {companies.length === 0 && (
                    <p>No hay empresas disponibles.</p>
                  )}
                </div>
                <div className="mt-3 d-flex justify-content-end">
                  <button
                    style={{ width: "210px" }}
                    className="btn btn-dark fw-semibold"
                    onClick={() => navigate("/admin/empresas")}
                  >
                    Administrar empresas
                  </button>
                </div>
              </div>
            </div>
            <div
              className="border rounded-3 p-3 mb-3 w-75"
              style={{ marginRight: "2.3rem" }}
            >
              <ReportsContainer details={false} />
            </div>
          </div>
        ) : (
          <Stats />
        )}
      </div>
    </main>
  );
};
{
}
