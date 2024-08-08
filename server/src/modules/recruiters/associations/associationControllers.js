import jwt from "jsonwebtoken";
import { createAssociation } from "./associationServices.js";

export const associateCompanyCtrl = async (req, res) => {
  try {
    const { companyId, message } = req.body;
    const { userId } = jwt.verify(
      req.headers.token,
      process.env.TOKEN_SECRET_KEY
    );

    const association = await createAssociation(userId, companyId, message);

    if (!association) return res.status(400).json();

    res.status(201).json();
  } catch (error) {
    res.status(500).json();
  }
};
