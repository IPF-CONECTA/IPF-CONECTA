import { getJobByIdSvc } from "../jobServices.js";
import {
  createJobPostulationSvc,
  getJobPostulationsSvc,
  changeJobPostulationStatusSvc,
} from "./jobPostulationService.js";

export const createJobPostulationCtrl = async (req, res) => {
  try {
    const { jobId } = req.body;

    if (!req.user || !req.user.profile || !req.user.profile.id) {
      return res.status(400).json({ error: "Perfil de usuario no encontrado" });
    }

    const profileId = req.user.profile.id;
    const jobPostulation = await createJobPostulationSvc(profileId, jobId);

    res.status(201).json({ message: "Postulación enviada!", jobPostulation });
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
};

export const getPostulationsCtrl = async (req, res) => {
  try {
    const { id } = req.user.profile;
    const { jobId } = req.params;
    const jobData = await getJobByIdSvc(jobId, id);

    if (jobData.job.dataValues.profileId !== id) return res.status(401).json();

    const postulations = await getJobPostulationsSvc(jobId);
    res.status(200).json(postulations);
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
};

export const changeJobPostulationStatusCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const jobPostulation = await changeJobPostulationStatusSvc(id);
    res.status(200).json(jobPostulation);
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
};
