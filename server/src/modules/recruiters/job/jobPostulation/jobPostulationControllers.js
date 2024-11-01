import {
  createJobPostulationSvc,
  getJobPostulationsSvc,
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
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

export const getPostulationsCtrl = async (req, res) => {
  try {
    const { jobId } = req.params;
    const postulations = await getJobPostulationsSvc(jobId);

    res.status(200).json(postulations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
