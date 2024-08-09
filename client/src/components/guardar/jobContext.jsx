// src/context/JobContext.js
import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const JobContext = createContext();

// Proveedor del contexto
export const JobProvider = ({ children }) => {
  const [savedJobs, setSavedJobs] = useState(new Set()); // Utiliza un Set para evitar duplicados
  const [appliedJobs, setAppliedJobs] = useState(new Set());

  // Función para guardar una oferta
  const toggleSaveJob = (jobId) => {
    setSavedJobs((prevSavedJobs) => {
      const newSavedJobs = new Set(prevSavedJobs);
      if (newSavedJobs.has(jobId)) {
        newSavedJobs.delete(jobId); // Eliminar si ya está guardada
      } else {
        newSavedJobs.add(jobId); // Añadir si no está guardada
      }
      return newSavedJobs;
    });
  };

  // Función para aplicar a una oferta
  const applyToJob = (jobId) => {
    setAppliedJobs((prevAppliedJobs) => new Set(prevAppliedJobs).add(jobId));
  };

  return (
    <JobContext.Provider value={{ savedJobs, appliedJobs, toggleSaveJob, applyToJob }}>
      {children}
    </JobContext.Provider>
  );
};

// Hook para usar el contexto
export const useJobContext = () => useContext(JobContext);
