import { useEffect, useState } from "react";
import { JobCard } from "./JobCard";
import { JobDetails } from "./JobDetails";
import { useNoti } from "../../../../hooks/useNoti";
import { getJobs } from "../services/jobServices";
import styles from "../../../../../public/css/jobSearch.module.css";

export const JobSearch = () => {
  const noti = useNoti();

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [cantJobs, setCantJobs] = useState(0);

  useEffect(() => {
    try {
      async function fetchData() {
        const res = await getJobs();
        if (res.status !== 200) {
          
          return;
        }
        setJobs(res.data.jobs);
        setCantJobs(res.data.total);
      }
      fetchData();
    } catch (error) {
      noti("Error al cargar los trabajos", "danger");
    } finally {
      setJobsLoading(false);
    }
  }, []);
  useEffect(() => {
    if (jobs.length > 0) {
      setSelectedJob(jobs[0].id);
    }
  }, [jobs]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setQuery(e.target.searchBar.value);
    const res = await getJobs(e.target.searchBar.value);
    if (res.status !== 200) {
      setJobs([]);
      setSelectedJob(null);
      setCantJobs(0);
      noti("No se encontraron trabajos con ese nombre", "info");
      return;
    }
    setCantJobs(res.data.total);
    setJobs(res.data.jobs);
    setCurrentPage(1);
    setTotalPages(res.data.totalPages);
  };

  const handleMoreJobsBtn = async (page) => {
    setCurrentPage(page);
    const res = await getJobs(query, page);
    setJobs([...jobs, ...res.data.jobs]);
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
    <main className="w-100 h-100 d-flex flex-column align-items-center mb-5 mt-3">
      <div className={`w-100`}>
        <nav
          className={` w-100  d-flex flex-column justify-content-center pb-3 align-items-center`}
        >
          <form
            className={`${styles.form}  d-flex justify-content-center w-50 p-0`}
            onSubmit={handleSubmit}
          >
            <div
              className={`w-75 border shadow-sm rounded-pill me-2  d-flex align-items-center ${styles.inputStyle}`}
            >
              <input
                type="text"
                name="searchBar"
                id="SearchBar"
                className={`w-100 m-0 me-2 p-0  ${styles.formInput}`}
                placeholder="Encuentra tu empleo ideal"
              />
              <button
                type="submit"
                className={`btn p-0 me-1 d-flex ${styles.searchButton}`}
              >
                <span className="material-symbols-outlined text-secondary">
                  search
                </span>
              </button>
            </div>
          </form>
        </nav>
        <hr className="w-100 m-0 " />
      </div>
      <div
        className={`filtersContainer w-100 d-flex flex-column align-items-center mt-3`}
      >
        <div className="w-50 gap-2 d-flex ">
          <select name="postDate" className="form-select" id="postDate">
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
          <select name="modality" className="form-select" id="modality">
            <option value="" defaultChecked>
              Modalidad
            </option>
          </select>
          <select name="contractType" className="form-select" id="contractType">
            <option value="" defaultChecked>
              Tipo de contrato
            </option>
          </select>
        </div>
        <section className={`${styles.jobsContainer} w-75 mt-3`}>
          <aside className="d-flex flex-column">
            <div className="d-flex flex-column align-items-start">
              {jobsLoading && (
                <div className={`d-flex w-100 justify-content-center my-3`}>
                  {" "}
                  <span
                    className={`spinner-border`}
                    role={`status`}
                    aria-hidden={`true`}
                  ></span>{" "}
                </div>
              )}
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
            <div className="w-100 d-flex justify-content-center mt-2">
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
          {selectedJob ? (
            <JobDetails jobId={selectedJob} />
          ) : (
            <aside
              className={`${styles.asideJobDetails} d-flex flex-column border align-items-center w-100`}
            >
              <span className="fs-2 fst-italic">Zzzzz...</span>
              <span className="mb-2 text-secondary">
                No se encontraron trabajos para tu búsqueda
              </span>
              <img
                src="./img/Man_Sleeping_in_Bed_Cartoon_Vector.png"
                alt="imagen"
                height={300}
              />
            </aside>
          )}
        </section>
      </div>
    </main>
  );
};
