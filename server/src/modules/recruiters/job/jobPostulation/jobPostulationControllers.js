import { createJobPostulationSvc } from "./jobPostulationService.js";

export const createJobPostulationCtrl = async (req, res) => {
  try {
    const { profileId, postId } = req.body;
    console.log({ profileId, postId });
    const jobPostulation = await createJobPostulationSvc(profileId, postId);
    return res
      .status(201)
      .json({ message: "Postulación creada exitosamente", jobPostulation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
