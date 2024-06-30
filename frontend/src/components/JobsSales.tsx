import { Link } from "react-router-dom";
import "../styles/JobsSales.css";

import { offers } from "../data/ofertas";

export default function JobsSales() {
  return (
    <div className="jobs-sales">
      {offers.map((offer) => (
        <div key={offer.id} className="job-item">
          <div>
            <h2>{offer.company.name}</h2>
            <p>Industria: {offer.company.industry}</p>
          </div>
          <p>Ubicación: {offer.company.location}</p>
          <Link to={`/job/${offer.id}`}>
            <button className="info">Ver más información</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
