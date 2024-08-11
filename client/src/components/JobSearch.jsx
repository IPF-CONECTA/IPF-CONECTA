import React, { useEffect, useState } from "react";
import { JobCard } from "./JobCard";
import { getJobs } from "../services/jobServices";
import { useNoti } from "../hooks/useNoti";
import { JobDetails } from "../pages/JobsDetailsPage";
import styles from "../../public/css/jobSearch.module.css";
export const JobSearch = () => {
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const noti = useNoti();
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [cantJobs, setCantJobs] = useState(0);
  useEffect(() => {
    async function fetchData() {
      const data = await getJobs();
      setJobs(data.jobs);
      setCantJobs(data.total);
    }
    fetchData();
  }, []);
  useEffect(() => {
    if (jobs.length > 0) {
      setSelectedJob(jobs[0].id);
    }
    console.log(jobs);
  }, [jobs]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setQuery(e.target.searchBar.value);
    const data = await getJobs(e.target.searchBar.value);
    console.log(data);
    setJobs(data.jobs);
    setCantJobs(data.total);
    setCurrentPage(1);
    setTotalPages(data.totalPages);
    if (data.total === 0) {
      setJobs([]);
      setSelectedJob(null);
      noti("No se encontraron trabajos con ese nombre", "info");
    }
  };
  const handleMoreJobsBtn = async (page) => {
    setCurrentPage(page);
    const data = await getJobs(query, page);
    setJobs([...jobs, ...data.jobs]);
    setCantJobs(jobs.length);
  };
  const handleCardClick = async (id) => {
    try {
      setSelectedJob(id);
    } catch (error) {
      console.log(error);
      noti("Error al cargar los detalles de la oferta de trabajo", "danger");
    }
  };

  return (
    <main className="w-100 h-100 d-flex flex-column align-items-center">
      <nav className="w-100 d-flex flex-column justify-content-center align-items-center">
        <form className="d-flex flex-column w-100" onSubmit={handleSubmit}>
          <div className="d-flex flex-row">
            <input
              type="text"
              name="searchBar"
              id="SearchBar"
              className="w-100 me-2"
              placeholder="Busca un trabajo"
            />
            <button type="submit" className="btn btn-success h-75">
              Buscar
            </button>
          </div>
          <div className="filters">
            <select name="postDate" id="postDate">
              <option value="" defaultChecked>
                Fecha de publicación
              </option>
              <option value="">En cualquier momento</option>
              <option value="">Último día</option>
              <option value="">Últimos 3 días</option>
              <option value="">Última semana</option>
              <option value="">Últimas 2 semanas</option>
              <option value="">Último mes</option>
            </select>
          </div>
        </form>
      </nav>

      <section className={`${styles.jobsContainer} w-75`}>
        <aside className="d-flex flex-column">
          <div className="d-flex flex-column align-items-start">
            {jobs.count === 0 ? (
              <h2>No se encontraron trabajos :(</h2>
            ) : (
              <>
                <>
                  {query ? (
                    <p>
                      {cantJobs} empleos de {query} encontrados
                    </p>
                  ) : (
                    ``
                  )}

                  {jobs &&
                    jobs.map((job) => (
                      <JobCard
                        selectedJob={selectedJob}
                        onClick={() => {
                          handleCardClick(job.id);
                        }}
                        key={job.id}
                        job={job}
                      />
                    ))}
                </>
              </>
            )}
          </div>
          <div className="w-100 d-flex justify-content-center">
            {cantJobs > 6 && cantJobs !== jobs.length && (
              <button
                count={totalPages}
                page={currentPage}
                onClick={() => {
                  handleMoreJobsBtn(currentPage + 1);
                }}
                className="btn btn-success"
              >
                Mostrar más empleos
              </button>
            )}
          </div>
        </aside>
        {selectedJob && <JobDetails jobId={selectedJob} />}
      </section>
    </main>
  );
};
