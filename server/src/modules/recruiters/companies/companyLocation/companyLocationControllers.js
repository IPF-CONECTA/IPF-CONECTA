import { createSvc } from "./companyLocationServices.js";

export const createCompanyLocationCtrl = async (req, res) => {
  try {
    const { companyLocation } = req.body;
    if (!companyLocation)
      throw new Error("Ubicación de empresa no encontrada");
    const newCompanyLocation = await createSvc(companyLocation);
    res.status(201).json({ message: " Ubicación de empresa creada", newCompanyLocation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
