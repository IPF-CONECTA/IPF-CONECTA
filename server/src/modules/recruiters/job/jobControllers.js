import { verifyToken } from "../../../helpers/verifyToken.js";
import {
  createNewJobSvc,
  deleteJobSvc,
  getJobsByUsernameSvc,
  findJobsSvc,
  getJobByIdSvc,
  getJobsSvc,
  updateJobSvc,
} from "./jobServices.js";

export const createNewJobCtrl = async (req, res) => {
  const { id } = req.user.profile;

  try {
    const newJob = await createNewJobSvc(req.body.jobData, id);
    res.status(201).json(newJob);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getJobsCtrl = async (req, res) => {
  try {
    const jobs = await getJobsSvc();
    if (jobs.length == 0)
      return res
        .status(404)
        .json({ message: "No se encontraron trabajos disponibles" });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getJobByIdCtrl = async (req, res) => {
  const { id } = req.params;
  try {

    if (!id) throw new Error("No se seleccionó ninguna oferta");
    let profileId
    if (req.headers.authorization) {
      ({ id: profileId } = await verifyToken(req.headers.authorization.split(" ")[1]));
    }
    const job = await getJobByIdSvc(id, profileId);

    if (!job)
      return res
        .status(404)
        .json({ message: "No se encontró la oferta seleccionada" });

    res.status(200).json(job);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

export const findJobsCtrl = async (req, res) => {
  const pageAsNumber = Number.parseInt(req.query.page);
  let page = 1;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) {
    page = pageAsNumber;
  }
  let { query } = req.query;
  if (!query) {
    query = "";
  }
  try {
    const jobs = await findJobsSvc(query, page - 1);
    if (jobs.count == 0)
      return res
        .status(404)
        .json({ message: "No se encontraron trabajos para tu búsqueda" });

    res.status(200).json({
      jobs: jobs.data.rows,
      totalPages: Math.ceil(jobs.count / 6),
      total: jobs.count,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getJobsByUsernameCtrl = async (req, res) => {
  try {
    const { username } = req.params;
    const jobs = await getJobsByUsernameSvc(username);
    return res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const deleteJobCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteJobSvc(id);
    return res.status(200).json("Oferta eliminada");
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

export const editJobCtrl = async (req, res) => {
  try {
    const { id: profileId } = req.user.profile;

    const { id: jobId } = req.params;

    const updatedJob = await updateJobSvc(jobId, req.body.jobData, profileId);
    res.status(200).json(updatedJob);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};
