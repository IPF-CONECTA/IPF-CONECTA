import { createSvc } from "./companyUbicationServices.js";

export const createCompamyUbicationCtrl = async (req, res) => {
  try {
    const { companyUbication } = req.body;
    if (!companyUbication)
      throw new Error("Ubicación de empresa no encontrada");
    const newCompanyUbication = await createSvc(companyUbication);
    res
      .status(201)
      .json({ message: " Ubicación de empresa creada", newCompanyUbication });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
