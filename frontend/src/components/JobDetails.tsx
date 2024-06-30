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
    <div>
      <h1>Empresa</h1>
      <p>{offer.company.name}</p>
      <p>{offer.company.address}</p>
      <p>{offer.company.location}</p>
      <p>{offer.company.employees}</p>
      <p>{offer.company.industry}</p>

      <h2> Oferta </h2>

      <p>{offer.jobOffer.description}</p>
      <p>{offer.jobOffer.location}</p>
      <p>{offer.jobOffer.modality}</p>
      <p>{offer.jobOffer.position}</p>
      <p>{offer.jobOffer.type}</p>

      <h1>Reclutador</h1>
      <p>{offer.recruiter.name}</p>
      <p>{offer.recruiter.role}</p>
    </div>
  );
}
