import { useEffect, useState } from "react";
import { projectsService } from "../../services/projectsServices";

export const ProfileProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    projectsService.getAllProjects().then((response) => {
      setProjects(response.data);
    });
  }, []);

  console.log(projects);

  return (
    <div className="container">
      <div className="row">
        {projects.map((project) => {
          return (
            <div className="col-md-4 mb-4" key={project.id}>
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
  );
};
