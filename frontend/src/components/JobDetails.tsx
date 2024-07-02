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
          <h3 className="grey">Compañía: {offer.company.name}</h3>
        </div>
        <div>
          <img
            src={"https://cdn-icons-png.flaticon.com/512/993/993891.png"}
            alt={offer.company.name}
            className="logo"
          />
        </div>
      </div>
      <div className="header">
        <div>
          <h2>Compañía</h2>
          <div className="grey">
            <p>Lugar: {offer.company.location}</p>
            <p>Dirección: {offer.company.address}</p>
            <p>Al rededor de {offer.company.employees} Empleados.</p>
          </div>
        </div>
        <div>
          <h3 className="recruiter-heading">
            <img
              src="https://icons.veryicon.com/png/o/internet--web/55-common-web-icons/person-4.png"
              alt="icon"
              className="icon"
            />
            Reclutador
          </h3>

          <div>
            <p className="grey">{offer.recruiter.name}</p>
            <p className="grey">{offer.recruiter.avatar}</p>
          </div>
        </div>
      </div>

      <h4>Oferta de trabajo:</h4>
      <div className="joboffer grey">
        <p>Descripción del Puesto: {offer.jobOffer.description}</p>
        <p>Lugar: {offer.jobOffer.location}</p>
        <p>Modalidad: {offer.jobOffer.modality}</p>
        <p>Puesto de trabajo: {offer.jobOffer.position}</p>
        <p>Tipo: {offer.jobOffer.type}</p>
      </div>
    </div>
  );
}
