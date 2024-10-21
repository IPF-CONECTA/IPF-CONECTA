import { CompanyLocation } from "./companyLocationModel.js";

export const createSvc = async (companyLocation) => {
  try {
    const newCompanyLocation = await CompanyLocation.create(companyLocation);
    // if (!newCompanyLocation)
    //   throw new Error("No se pudo crear la ubicación de la empresa");
    return newCompanyLocation;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const remove = async (id) => {
  try {
    await CompanyLocation.destroy({
      where: { id },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
