import { Link } from "react-router-dom";
import "../styles/JobsSales.css";
import axios from "axios";
import { useState } from "react";

export default function JobsSales() {
  const [jobs, setJobs] = useState([]);

  const getJobs = () => {
    axios.get("http://localhost:4000/get-jobs").then((response) => {
      setJobs(response.data);
    });
  };



  return (
    <div className="jobs">
      <h1>Jobs in Sales</h1>
      <button onClick={getJobs}>Get Jobs</button>
      <div className="jobs-sales">
        {jobs.map((job: any) => (
          <div key={job.id} className="job-card">
            <h2>{job.title}</h2>
            <p>{job.description}</p>
            <Link to={`/get-job/${job.id}`}>View Job</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
