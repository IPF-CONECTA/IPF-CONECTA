import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/JobDetails.css";

export default function JobDetails() {
  const { id } = useParams<{ id: string }>();

  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getJobInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/get-job/${id}`);
        setJob(response.data);
      } catch (error) {
        console.error("Error fetching job data:", error);
      } finally {
        setLoading(false);
      }
    };

    getJobInfo();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!job) {
    return <div>Job not found</div>;
  }

  const modalityMap: { [key: number]: string } = {
    1: "Presencial",
    2: "Remoto",
    3: "Híbrido",
    4: "Flexible",
  };

  const contractType: { [key: number]: string } = {
    1: "Jornada completa",
    2: "Media jornada",
    3: "Por horas",
    4: "Por proyecto",
    5: "Temporal",
    6: "Freelance",
    7: "Voluntariado",
    8: "Prácticas",
    9: "Otro",
  };

  const industriesMap: { [key: number]: string } = {
    1: "Administración Pública y Defensa",
    2: "Aeroespacial",
    3: "Agricultura, Silvicultura, Pesca y Caza",
    4: "Alimentos y Bebidas",
    5: "Arte, Entretenimiento y Recreación",
    6: "Automotriz",
    7: "Biotecnología",
    8: "Comercio Mayorista y Minorista",
    9: "Construcción",
    10: "Educación",
    11: "Energía",
    12: "Farmacéutica",
    13: "Finanzas",
    14: "Finanzas y Seguros",
    15: "Hospitalidad y Turismo",
    16: "Industria Manufacturera",
    17: "Información y Comunicaciones",
    18: "Inmobiliarias y Servicios de Alquiler",
    19: "IT",
    20: "Logística y Transporte",
    21: "Marketing",
    22: "Media",
    23: "Medios de Comunicación y Entretenimiento",
    24: "Minería y Metales",
    25: "Petróleo y Gas",
    26: "Productos de Consumo",
    27: "Salud",
    28: "Servicios de Alojamiento y Alimentación",
    29: "Servicios Médicos",
    30: "Servicios Profesionales, Científicos y Técnicos",
    31: "Tecnología de la Información y Telecomunicaciones",
    32: "Textil y Vestimenta",
    33: "Transporte y Almacenamiento",
  };

  return (
    <div className="container">
      <div className="header">
        <div>
          <h1>Detalles de la oferta de trabajo</h1>
          <h2 className="grey">{job.title}</h2>
        </div>
        <div>
          <img
            src={`${job.company.logoUrl}`}
            alt={job.company.name}
            className="logo"
          />
        </div>
      </div>

      <div className="header">
        <div>
          <h2>Compañía</h2>
          <div className="grey">
            <h3>Nombre: {job.company.name}</h3>
            <p>
              Lugar: {job.company.cityID ?? " No especificado por la empresa-"}
            </p>
            <p></p>
            <p>Dirección: {job.company.address}</p>
            <p>
              Cuenta con al rededor de: {job.company.cantEmployees} empleados
            </p>
            <p>
              Industria a la que pertenece:{" "}
              {industriesMap[job.company.industryId]}
            </p>
          </div>
        </div>
        <div>
          <h4>Recruiter</h4>
          <div className="recruiter-heading">
            <img
              src={job.user.profilePic}
              alt="Recruiter profile"
              className="icon"
            />
          </div>
          <div>
            <div className="grey"> {job.user.names}</div>
            <div className="grey">{job.user.surnames}</div>
          </div>
        </div>
      </div>

      <h4>Oferta de Trabajo:</h4>
      <div className="joboffer grey">
        <p>Descripción del trabajo:{job.description}</p>
        <p>Modalidad: {modalityMap[job.modalityId]}</p>
        <p>Tipo de contrato: {contractType[job.contractTypeId]}</p>
        <p>Requisitos:</p>
        <ul>
          {job.jobSkills.map((jobSkill: any) => (
            <li key={jobSkill.skillId}>{jobSkill.skill.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
