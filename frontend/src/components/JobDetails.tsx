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
      <div className="header">
        <div>
          <h2>{offer.company.name}</h2>
          <h3 className="grey">Compañía: {offer.company.industry}</h3>
        </div>
        <div>
          <img
            src={"https://cdn-icons-png.flaticon.com/512/993/993891.png"}
            alt={offer.company.name}
            className="logo"
          />
        </div>
      </div>
      <div className="main">
        <div>
          <h1>Compañía</h1>

          <p>Lugar: {offer.company.location}</p>
          <p>Dirección: {offer.company.address}</p>
          <p>Al rededor de {offer.company.employees} Empleados.</p>
        </div>
        <div>
          <h3>Reclutador</h3>
          <h4> Nombre: {offer.recruiter.name}</h4>
          <p>{offer.recruiter.role}</p>
        </div>
      </div>

      <div className="joboffer">

      <p>Descripción del Puesto: {offer.jobOffer.description}</p>
      <h3>Ubicación</h3>
      <p>{offer.jobOffer.location}</p>
      <h3>Modalidad</h3>
      <p>{offer.jobOffer.modality}</p>
      <h3>Posición (Especialización)</h3>
      <p>{offer.jobOffer.position}</p>

      </div>
    </div>
  );
}
