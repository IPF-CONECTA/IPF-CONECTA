import { Link } from "react-router-dom";
import "../styles/JobsSales.css";

import { offers } from "../data/ofertas";

export default function JobsSales() {
  return (
    <div className="jobs-sales">
      {offers.map((offer) => (
        <div key={offer.id} className="job-card">
          <div className="name">
            <h2>{offer.company.name}</h2>
            <h3>{offer.company.industry}</h3>
          </div>
          <div className="info">
            <h4 className="ubication"> {offer.company.location}</h4>
            <h5 className="type">{offer.jobOffer.type  }</h5>
          </div>
          <Link to={`/job/${offer.id}`}>
            <button className="info-button">...</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
