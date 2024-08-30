import jwt from "jsonwebtoken";
import { createAssociation, getApprovedAssociationsByUser } from "./associationServices.js";

export const associateCompanyCtrl = async (req, res) => {
  try {
    const { companyId, message } = req.body;
    const { id } = req.user.profile;
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

export const getApprovedAssociationsByUserCtrl = async (req, res) => {
  const { id } = req.user.profile;
  try {
    const associations = await getApprovedAssociationsByUser(id)

    if (associations.length == 0) return res.status(404).json()

    res.status(200).json(associations)
  } catch (error) {
    res.status(500).json(error.message)
  }
}