import { useParams } from "react-router-dom";
import { offers } from "../data/ofertas";
import "../styles/JobDetails.css";
export default function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const offer = offers.find((offer) => offer.id === Number(id));
  if (!offer) {
    return <h1>Oferta no encontrada</h1>;
  }

  return (
    <div className="container">
      <div className="jobdetails-sidebar">
        <div className="main-info">
          <h2>{offer.company.name}</h2>
          <p>{offer.company.industry}</p>
        </div>

        <p>{offer.company.address}</p>
        <p>{offer.company.location}</p>
        <p>{offer.company.employees} empleados</p>

        <h3>Reclutador</h3>
        <h4>Nombre:</h4>
        <p>{offer.recruiter.name}</p>
        <h4>Rol</h4>
        <p>{offer.recruiter.role}</p>
      </div>

      <div className="jobdetails-main">
        <h2>Oferta</h2>
        <div className="job-details">
          <h3>Descripción del Puesto</h3>
          <p>{offer.jobOffer.description}</p>
          <h3>Ubicación</h3>
          <p>{offer.jobOffer.location}</p>
          <h3>Modalidad</h3>
          <p>{offer.jobOffer.modality}</p>
          <h3>Posición (Especialización)</h3>
          <p>{offer.jobOffer.position}</p>
          <h3>Tipo </h3>
          <p>{offer.jobOffer.type}</p>
        </div>
      </div>
    </div>
  );
}
