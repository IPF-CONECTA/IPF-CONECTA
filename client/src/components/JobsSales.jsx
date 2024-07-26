import { Link } from "react-router-dom";
import "../styles/JobsSales.css";
import axios from "axios";
import { useState } from "react";
import { contractType, industriesMap } from "../helpers/mapings.js";
import { useNavigate } from "react-router-dom";
import { Nav } from "../pages/Nav.jsx";

export default function JobsSales() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  const getJobs = () => {
    axios.get("http://localhost:4000/get-jobs").then((response) => {
      setJobs(response.data);
    });
  };

  return (
    <>
      <Nav />
      <div className="jobs">
        <h1>Ofertas de trabajos.</h1>
        <button onClick={getJobs} className="info-button ps-3">
          Mostrar ofertas disponibles
        </button>
        <div className="jobs-sales">
          {jobs.map((job) => (
            <div key={job.id} className="job-card">
              <h1>{job.title}</h1>
              <h2>{job.company.name}</h2>
              <h4 className="grey">{industriesMap[job.contractTypeId]}</h4>
              <div className="end">
                <h4 className="type">{contractType[job.contractTypeId]}</h4>
                {/* <Link to={`job/${job.id}`}>
                <button className="info-button">Ver más</button>
              </Link> */}
                <button
                  onClick={() => {
                    navigate(`/job/${job.id}`);
                  }}
                >
                  Ver más Información
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
