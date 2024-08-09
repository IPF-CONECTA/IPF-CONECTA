import jwt from "jsonwebtoken";
import { createAssociation } from "./associationServices.js";

export const associateCompanyCtrl = async (req, res) => {
  try {
    const { companyId, message } = req.body;
    let token = req.headers.authorization;

    token = token.split(" ")[1];
    token = token.replace(/['"]+/g, "");
    const { userId } = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

    const association = await createAssociation(userId, companyId, message);

    if (!association) return res.status(400).json();

    res.status(201).json();
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
};
