import { useState } from "react";
import { projectsService } from "../../services/projectsServices";

export const ProfileProjects = () => {
  const [projects, setProjects] = useState([]);

  //projectsService.getMyProjects();
  projectsService.getAllProjects();

  return (
    <div>
      <h1>Projects</h1>
      <ul> </ul>
    </div>
  );
};
