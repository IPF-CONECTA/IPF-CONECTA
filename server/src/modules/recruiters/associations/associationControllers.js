import jwt from "jsonwebtoken";
import { createAssociation } from "./associationServices.js";

export const associateCompanyCtrl = async (req, res) => {
  try {
    const { companyId, message } = req.body;
    const { id } = req.user;
    const association = await createAssociation(id, companyId, message);

    if (!association) return res.status(400).json();

    console.log(association);
    res.status(201).json({
      message: "Solicitud enviada correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
};
