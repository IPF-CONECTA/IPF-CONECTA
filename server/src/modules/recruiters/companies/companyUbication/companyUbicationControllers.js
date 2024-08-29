import { createSvc } from "./companyUbicationServices.js";

export const createCtrl = async (req, res) => {
  try {
    const { companyUbication } = req.body;
    console.log({ companyUbication });
    if (!companyUbication)
      throw new Error("Ubicación de empresa no encontrada");
    const newCompanyUbication = await createSvc(companyUbication);
    console.log(newCompanyUbication);
    res.status(201).json(newCompanyUbication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
