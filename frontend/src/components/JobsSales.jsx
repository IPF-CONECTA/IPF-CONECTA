import { Link } from "react-router-dom";
import "../styles/JobsSales.css";
import axios from "axios";
import { useState } from "react";
import { contractType, industriesMap } from "../helpers/maping";


export default function JobsSales() {
  const [jobs, setJobs] = useState([]);

  const getJobs = () => {
    axios.get("http://localhost:4000/get-jobs").then((response) => {
      setJobs(response.data);
    });
  };
{
  jobs.map(job => {
  console.log()

  })
}
  return (
    <div className="jobs">
      <h1>Jobs in Sales</h1>
      <button onClick={getJobs}>Get Jobs</button>
      <div className="jobs-sales">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <h1>{job.company.name}</h1>
            <h2>{job.title}</h2>
            <h4 className="grey">{industriesMap[job.contractTypeId]}</h4>
            <div className="end">
              <h4 className="type">{contractType[job.contractTypeId]}</h4>
              <Link to={`/get-job/${job.id}`}>
                <button className="info-button"> Ver más</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}