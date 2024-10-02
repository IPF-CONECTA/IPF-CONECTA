import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { projectsService } from "../project/services/projectsServices";

export const ProfileProjects = () => {
  const [projects, setProjects] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    projectsService.getProjects().then((response) => {
      setProjects(response.data);
    });
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="text-center mt-2 mb-2">Proyectos de: {username}</h1>
        <div className="row">
          {projects.map((project) => {
            return (
              <div className="col-md-3 mb-4" key={project.id}>
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">{project.name}</h5>
                  </div>
                  <img
                    src={project.projectLogo}
                    className="card-img-top"
                    alt={project.name}
                  />
                  <div className="card-body">
                    <p className="card-text">{project.description}</p>
                  </div>
                  <div className="card-footer">
                    <p>
                      Estado: <strong>{project.status}</strong>
                    </p>
                    <a href={project.projectLink} target="_blank">
                      <button className="btn btn-outline-success">
                        Ver proyecto
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
