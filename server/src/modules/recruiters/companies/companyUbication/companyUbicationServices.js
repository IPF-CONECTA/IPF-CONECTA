import { CompanyUbication } from "./companyUbicationModel.js";

export const createSvc = async (companyUbication) => {
  try {
    const newCompanyUbication = await CompanyUbication.create(companyUbication);
    // if (!newCompanyUbication)
    //   throw new Error("No se pudo crear la ubicación de la empresa");
    return newCompanyUbication;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const remove = async (id) => {
  try {
    await CompanyUbication.destroy({
      where: { id },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
