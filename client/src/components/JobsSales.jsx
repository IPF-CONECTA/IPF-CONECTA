// import { Link } from "react-router-dom";
// import "../styles/JobsSales.css";
// import axios from "axios";
// import { useState } from "react";
// import { Nav } from "../pages/Nav.jsx";
// import { JobCard } from "./JobCard.jsx";

// export default function JobsSales() {
//   const [jobs, setJobs] = useState([]);

//   const getJobs = () => {
//     axios.get("http://localhost:4000/get-jobs").then((response) => {
//       setJobs(response.data);
//     });
//   };

//   return (
//     <>
//       <Nav />
//       <div className="jobs">
//         <h1>Ofertas de trabajos.</h1>
//         <button onClick={getJobs} className="info-button ps-3">
//           Mostrar ofertas disponibles
//         </button>
//         <div className="jobs-sales">
//           {jobs.map((job) => (
//             <JobCard key={job.id} job={job} />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }
