import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../public/JobDetails.css";
import { industriesMap, contractType, modalityMap } from "../helpers/mapings";

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

  console.log(job.company.logoUrl);

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
      </div>
      <h4>Requisitos:</h4>

      <ul className="grey">
        {job.jobSkills.map((jobSkill: any) => (
          <li key={jobSkill.skillId}>{jobSkill.skill.name}</li>
        ))}
      </ul>
    </div>
  );
}
