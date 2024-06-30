import { Link } from "react-router-dom";
import "../styles/JobsSales.css";

import { offers } from "../data/ofertas";

export default function JobsSales() {

    return  <div className="jobs-sales">
    {offers.map((offer) => (
      <div key={offer.id} className="job-item">
        <h2>{offer.company.name}</h2>
        <p>Industria: {offer.company.industry}</p>
        <p>Ubicación: {offer.company.location}</p>
        <Link to={`/job/${offer.id}`}>
          <button>Ver más información</button>
        </Link>
      </div>
    ))}
  </div>;
}
