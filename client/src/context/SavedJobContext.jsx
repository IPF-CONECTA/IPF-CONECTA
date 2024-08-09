import React, { createContext, useContext, useState } from 'react';

// Crea el contexto
const SavedJobsContext = createContext();

// Proveedor del contexto
export const SavedJobsProvider = ({ children }) => {
  const [savedJobs, setSavedJobs] = useState([]);

  const saveJob = (job) => {
    setSavedJobs([...savedJobs, job]);
    // Puedes guardar en localStorage si quieres persistencia
    localStorage.setItem('savedJobs', JSON.stringify([...savedJobs, job]));
  };

  const removeJob = (jobId) => {
    const updatedJobs = savedJobs.filter(job => job.id !== jobId);
    setSavedJobs(updatedJobs);
    localStorage.setItem('savedJobs', JSON.stringify(updatedJobs));
  };

  return (
    <SavedJobsContext.Provider value={{ savedJobs, saveJob, removeJob }}>
      {children}
    </SavedJobsContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useSavedJobs = () => useContext(SavedJobsContext);
