import jwt from "jsonwebtoken";
import { ALL_ROLES } from "../../constant/roles.js";
import { User } from "../../modules/users/userModel.js";
import { Association } from "../../modules/recruiters/associations/associationModel.js";

export const isRecruiter = async (req, res, next) => {
  try {
    let token = req.headers;
    token = token.authorization.split(" ")[1];
    token = token.replace(/['"]+/g, "");

    if (!token) throw new Error("Inicie sesión para continuar");
    const { userId } = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

    const result = await User.findByPk(userId, { attributes: ["roleId"] });
    if (!result) throw new Error("Vuelva a iniciar sesión para continuar");
    const { roleId } = result;

    if (roleId !== ALL_ROLES.recruiter) {
      throw new Error("No tiene permisos para realizar esta acción");
    }
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const isApprovedAssociation = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    token = token.split(" ")[1];
    const { companyId } = req.body.jobData;
    if (!token) throw new Error("Inicie sesión para continuar");
    const { userId } = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const association = Association.findOne({
      where: { profileId: userId, companyId: companyId },
    });
    if (!association)
      throw new Error("No tiene permiso para realizar esta acción");
    if (association.status == "Rechazada")
      throw new Error(
        "No tiene permiso para publicar una oferta para esta empresa. Su asociación con esta fue rechazada."
      );
    if (association.status == "Pendiente")
      throw new Error(
        "No puede publicar ofertas para esta empresa, su asociación esta siendo revisada."
      );
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: error.message });
  }
};
