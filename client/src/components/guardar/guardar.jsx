import React from 'react';
import { useSavedJobs } from './jobContext';

const JobCard = ({ job }) => {
  const { saveJob } = useSavedJobs();

  return (
    <div>
      <h3>{job.title}</h3>
      <button onClick={() => saveJob(job)}>Guardar Trabajo</button>
    </div>
  );
};

const SavedJobsPage = () => {
  const { savedJobs, removeJob } = useSavedJobs();

  return (
    <div>
      <h2>Mis Trabajos Guardados</h2>
      {savedJobs.map((job) => (
        <div key={job.id}>
          <h3>{job.title}</h3>
          <button onClick={() => removeJob(job.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};

export default SavedJobsPage;
