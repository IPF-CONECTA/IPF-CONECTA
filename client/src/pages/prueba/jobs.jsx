import React, { useState } from "react";
import AddCompany from "./addCompany";
import AddJob from  "./AddJobs"
import JobList from "./jobList";
import styles from "./css/jobs.module.css";

const Job = () => {
  const [companies, setCompanies] = useState([
    {
      id: "1",
      name: "Tech ompany",
      description: "Empresa de tecnología innovadora.",
      industryId: 1,
      locationType: "Remoto",
      locationId: 123,
      address: "123 Calle Falsa",
      companyImage: "https://images.unsplash.com/photo-1518779578993-ec3579fee39e",
      cantEmployees: "50-100",
      photos: ["https://images.unsplash.com/photo-1579546929662-711aa81148cf"]
    },
    {
      id: "2",
      name: "Design Corp",
      description: "Empresa de diseño de interfaces y experiencias de usuario.",
      industryId: 2,
      locationType: "Presencial",
      locationId: 456,
      address: "456 Calle Creativa",
      companyImage: "https://images.unsplash.com/photo-1518779578993-ec3579fee39e",
      cantEmployees: "10-50",
      photos: ["https://images.unsplash.com/photo-1505761671935-60b3a7427bad"]
    },
    {
      id: "3",
      name: "Business Solutions",
      description: "Consultora de soluciones empresariales y gestión de proyectos.",
      industryId: 3,
      locationType: "Híbrido",
      locationId: 789,
      address: "789 Calle Empresarial",
      companyImage: "https://images.unsplash.com/photo-1518779578993-ec3579fee39e",
      cantEmployees: "100-200",
      photos: ["https://images.unsplash.com/photo-1581093588401-3a89e7a70d76"]
    },
    {
      id: "4",
      name: "Data Insights",
      description: "Empresa de análisis de datos y consultoría.",
      industryId: 4,
      locationType: "Remoto",
      locationId: 101,
      address: "101 Calle de Datos",
      companyImage: "https://images.unsplash.com/photo-1518779578993-ec3579fee39e",
      cantEmployees: "20-50",
      photos: ["https://images.unsplash.com/photo-1551836022-d5d88e9218df"]
    },
    {
      id: "5",
      name: "SecureTech",
      description: "Empresa especializada en ciberseguridad.",
      industryId: 5,
      locationType: "Remoto",
      locationId: 202,
      address: "202 Calle Segura",
      companyImage: "https://images.unsplash.com/photo-1518779578993-ec3579fee39e",
      cantEmployees: "50-100",
      photos: ["https://images.unsplash.com/photo-1560264357-8d7c1e5f6d0b"]
    }
  ]);
  

  const [jobs, setJobs] = useState([
    {
      title: "Desarrollador Frontend",
      description: "Buscamos un desarrollador frontend con experiencia en React.",
      company: "Tech Company",
      companyImage: "https://images.unsplash.com/photo-1518779578993-ec3579fee39e",
      position: "Junior",
      location: "Remoto"
    },
    {
      title: "Desarrollador Backend",
      description: "Se requiere un desarrollador backend con conocimientos en Node.js.",
      company: "Tech Company",
      companyImage: "https://images.unsplash.com/photo-1532619342150-6e4e5e3069b0",
      position: "Senior",
      location: "Remoto"
    },
    {
      title: "Diseñador UX/UI",
      description: "Buscamos un diseñador UX/UI con experiencia en diseño de interfaces.",
      company: "Design Corp",
      companyImage: "https://images.unsplash.com/photo-1581291519195-ef11498d1cf5",
      position: "Mid-Level",
      location: "Presencial"
    },
    {
      title: "Gerente de Proyecto",
      description: "Se necesita un gerente de proyecto con habilidades en gestión ágil.",
      company: "Business Solutions",
      companyImage: "https://images.unsplash.com/photo-1581093588401-3a89e7a70d76",
      position: "Senior",
      location: "Híbrido"
    },
    {
      title: "Analista de Datos",
      description: "Buscamos un analista de datos con experiencia en Python y SQL.",
      company: "Data Insights",
      companyImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
      position: "Junior",
      location: "Remoto"
    },
    {
      title: "Especialista en Seguridad",
      description: "Se requiere un especialista en seguridad con experiencia en ciberseguridad.",
      company: "SecureTech",
      companyImage: "https://images.unsplash.com/photo-1560264357-8d7c1e5f6d0b",
      position: "Senior",
      location: "Remoto"
    },
    {
      title: "Desarrollador Frontend",
      description: "Buscamos un desarrollador frontend con experiencia en React.",
      company: "Tech Company",
      companyImage: "https://images.unsplash.com/photo-1518779578993-ec3579fee39e",
      position: "Junior",
      location: "Remoto"
    },
    {
      title: "Desarrollador Backend",
      description: "Se requiere un desarrollador backend con conocimientos en Node.js.",
      company: "Tech Company",
      companyImage: "https://images.unsplash.com/photo-1532619342150-6e4e5e3069b0",
      position: "Senior",
      location: "Remoto"
    },
    {
      title: "Diseñador UX/UI",
      description: "Buscamos un diseñador UX/UI con experiencia en diseño de interfaces.",
      company: "Design Corp",
      companyImage: "https://images.unsplash.com/photo-1581291519195-ef11498d1cf5",
      position: "Mid-Level",
      location: "Presencial"
    },
    {
      title: "Gerente de Proyecto",
      description: "Se necesita un gerente de proyecto con habilidades en gestión ágil.",
      company: "Business Solutions",
      companyImage: "https://images.unsplash.com/photo-1581093588401-3a89e7a70d76",
      position: "Senior",
      location: "Híbrido"
    },
    {
      title: "Analista de Datos",
      description: "Buscamos un analista de datos con experiencia en Python y SQL.",
      company: "Data Insights",
      companyImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
      position: "Junior",
      location: "Remoto"
    },
    {
      title: "Especialista en Seguridad",
      description: "Se requiere un especialista en seguridad con experiencia en ciberseguridad.",
      company: "SecureTech",
      companyImage: "https://images.unsplash.com/photo-1560264357-8d7c1e5f6d0b",
      position: "Senior",
      location: "Remoto"
    },
    {
      title: "Desarrollador Frontend",
      description: "Buscamos un desarrollador frontend con experiencia en React.",
      company: "Tech Company",
      companyImage: "https://images.unsplash.com/photo-1518779578993-ec3579fee39e",
      position: "Junior",
      location: "Remoto"
    },
    {
      title: "Desarrollador Backend",
      description: "Se requiere un desarrollador backend con conocimientos en Node.js.",
      company: "Tech Company",
      companyImage: "https://images.unsplash.com/photo-1532619342150-6e4e5e3069b0",
      position: "Senior",
      location: "Remoto"
    },
    {
      title: "Diseñador UX/UI",
      description: "Buscamos un diseñador UX/UI con experiencia en diseño de interfaces.",
      company: "Design Corp",
      companyImage: "https://images.unsplash.com/photo-1581291519195-ef11498d1cf5",
      position: "Mid-Level",
      location: "Presencial"
    },
    {
      title: "Gerente de Proyecto",
      description: "Se necesita un gerente de proyecto con habilidades en gestión ágil.",
      company: "Business Solutions",
      companyImage: "https://images.unsplash.com/photo-1581093588401-3a89e7a70d76",
      position: "Senior",
      location: "Híbrido"
    },
    {
      title: "Analista de Datos",
      description: "Buscamos un analista de datos con experiencia en Python y SQL.",
      company: "Data Insights",
      companyImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
      position: "Junior",
      location: "Remoto"
    },
    {
      title: "Especialista en Seguridad",
      description: "Se requiere un especialista en seguridad con experiencia en ciberseguridad.",
      company: "SecureTech",
      companyImage: "https://images.unsplash.com/photo-1560264357-8d7c1e5f6d0b",
      position: "Senior",
      location: "Remoto"
    }
  ]);
  
  const addCompany = (company) => {
    setCompanies([...companies, company]);
  };

  const addJob = (job) => {
    setJobs([...jobs, job]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <AddCompany onAddCompany={addCompany} />
        <AddJob companies={companies} onAddJob={addJob} />
      </div>
      <JobList jobs={jobs} companies={companies} />
    </div>
  );
};

export default Job;
